const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const {connectDB, queryDB} = require('./common')

const getPace = async (student, course) => {

//  Get pace of students. Words per test

  const DefaultPace = 20
  const paceQuery = `SELECT pace FROM public.student_stats
                     WHERE student='${student}' AND course='${course}'`
  const conn = await connectDB()
  const pace = await queryDB(conn, paceQuery)
  return  pace[0].pace
}

const getTestWords = async (student, course) => {

  //Get Test words that need to be tested and returns list of words and count

  //Get Words from student wordbank
  const wordbankQuery = `SELECT word, word_id, mastery FROM public.wordbank
                         WHERE student='${student}' AND course='${course}' AND cycle=1
                         AND mastery < 75`
  const conn = await connectDB()
  const words = await queryDB(conn, wordbankQuery)
  // console.log(words)
  return words
}

const getNewWords = async (student, course, count) => {
  const newWordsQuery = `SELECT word, word_id, definition, examples, images, breakdown, phonetics, complexity, category FROM public.words
                         WHERE course='${course}'
                         EXCEPT
                            SELECT public.words.word, public.words.word_id, definition, examples, images,breakdown, phonetics, complexity, category
                            FROM public.words
                            INNER JOIN public.wordbank
                            ON public.wordbank.word_id = public.words.word_id
                         ORDER BY complexity`
  const conn = await connectDB()
  const words = await queryDB(conn, newWordsQuery)
  // console.log(words)
  return words.slice(0, count)
}

const insertWordMap = async (student, course, word, word_id, wordmap) => {
  const wordMapObj = {
    student: student,
    course: course,
    word: word,
    word_id: word_id,
    conn_count: wordmap.length,
    associations: JSON.stringify({'map': wordmap}),
    date: new Date()
  }
  const query = {
    text: `INSERT INTO public.wordmaps(
          student, course, word, word_id, conn_count, associations, date)
          VALUES($1, $2, $3, $4, $5, $6, $7)`,
    values: Object.values(wordMapObj)
  }
  const conn = await connectDB()
  const res = await queryDB(conn, query)
  // console.log(words)
  return res
}

const insertStudyRecord = async (student, course, word, word_id, records) => {
  const studyRecord = {
    student: student,
    course: course,
    date: new Date(),
    records: JSON.stringify({'records': records}),
    word: word,
    word_id: word_id
  }
  const query = {
    text: `INSERT INTO public.study_records(
          student, course, date, records, word, word_id)
          VALUES($1, $2, $3, $4, $5, $6)`,
    values: Object.values(studyRecord)
  }
  const conn = await connectDB()
  const res = await queryDB(conn, query)
  return res
}

const insertEndStudy = async (student, course) => {
  const studyRecord = {
    student: student,
    course: course,
    date: new Date(),
    comments: 'End Study Round'
  }
  const query = {
    text: `INSERT INTO public.study_records(
          student, course, date, comments)
          VALUES($1, $2, $3, $4)`,
    values: Object.values(studyRecord)
  }
  const conn = await connectDB()
  const res = await queryDB(conn, query)
  return res
}

const setTestReady = async (student, course) => {
  const query = `UPDATE public.student_stats
                 SET test_ready=true
                 WHERE student='${student}' AND course='${course}'`
 const conn = await connectDB()
 const res = await queryDB(conn, query)
 return res
}

const getAllLearnWords = async (student, course) => {
  const query = `SELECT COUNT(*) FROM public.wordbank
                 WHERE student='${student}' AND course='${course}'`
 const conn = await connectDB()
 const res = await queryDB(conn, query)
 return res[0].count
}

const getAllMasteredWords = async (student, course) => {
  const query = `SELECT COUNT(*) FROM public.wordbank
                 WHERE student='${student}' AND course='${course}' AND mastery > 75`
 const conn = await connectDB()
 const res = await queryDB(conn, query)
 return res[0].count
}

const updateAfterStudy = async (student, course) => {
  const allWords = await getAllLearnWords(student, course)
  const query = `UPDATE public.student_stats
                 SET words_learning=${allWords}, test_ready=true
                 WHERE student='${student}' AND course='${course}'`
  const conn = await connectDB()
  const res = await queryDB(conn, query)
  return res
}

router.post('/endstudy', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const queryData = req.body
  const course = req.body.course

  await insertEndStudy(id, course)
  await updateAfterStudy(id, course)

  res.json({ status: 200 })
}))

const insertTestRecord = async (student, course, word, word_id, records) => {
  const testRecord = {
    student: student,
    course: course,
    date:new Date(),
    records: JSON.stringify({'records': records}),
    word: word,
    word_id: word_id
  }
  const query = {
    text: `INSERT INTO public.test_records(
          student, course, date, records, word, word_id)
          VALUES($1, $2, $3, $4, $5, $6)`,
    values: Object.values(testRecord)
  }
  const conn = await connectDB()
  const res = await queryDB(conn, query)
  return res
}

router.get('/gettestwords', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const course_id = req.apiGateway.event.queryStringParameters.course_id
  if (course_id === '') {
    res.json({ status: 'error', message: 'No test found' })
  }

  const words = await getTestWords(id, course_id)
  res.json(words)
  // res.json({status: 'test'})
}));

router.get('/getnewwords', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const course_id = req.apiGateway.event.queryStringParameters.course_id
  console.log(course_id)
  if (course_id === '') {
    res.json({ status: 'error', message: 'No test found' })
  }
  const pace = await getPace(id, course_id)
  const words = await getTestWords(id, course_id)
  const testlength = words.length

  const newWordsCount = pace - testlength
  const newWords = await getNewWords(id, course_id, newWordsCount)

  res.json(newWords)
}));

router.post('/wordbank', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const queryData = req.body
  const word = {
    student: id,
    course : queryData.course,
    word: queryData.word,
    word_id: queryData.word_id,
    cycle: 1,
    bracket: '',
    duration: queryData.duration,
    mastery: 0,
    summary: '{}',
    date_created: new Date(),
    date_updated: new Date()
  }
  console.log(queryData)
  const query = {
    text: `INSERT INTO public.wordbank(
          student, course, word, word_id, cycle, bracket, duration, mastery, summary, date_created, date_updated)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    values: Object.values(word)
  }

  const conn = await connectDB()
  const result = await queryDB(conn, query)
  const wordmap = await insertWordMap(id, queryData.course, queryData.word, queryData.word_id, queryData.wordmap)
  const record = await insertStudyRecord (id, queryData.course, queryData.word, queryData.word_id, queryData.records)
  res.json(result)
}));

router.post('/testrecords', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const queryData = req.body
  const record = {
    student: id,
    course : queryData.course,
    date: new Date(),
    word: queryData.word,
    word_id: queryData.word_id,
    answer: queryData.answer,
    result: queryData.result,
    duration: queryData.duration,
    section: queryData.section
    // records: queryData.records || '{}'
  }
  const query = {
    text: `INSERT INTO public.test_records(
          student, course, date, word, word_id, answer, result, duration, section)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    values: Object.values(record)
  }

  const conn = await connectDB()
  const result = await queryDB(conn, query)
//  const wordmap = await insertWordMap(id, queryData.course, queryData.word, queryData.word_id, queryData.wordmap)
//  const record = await insertStudyRecord (id, queryData.course, queryData.word, queryData.word_id, queryData.records)
  res.json(result)
}));

router.get('/mystats', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const course = req.apiGateway.event.queryStringParameters.course
  const query = `SELECT * FROM public.student_stats
                 WHERE student='${id}' AND course='${course}'`
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}))

router.get('/mystudyhistory', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const course = req.apiGateway.event.queryStringParameters.course
  const query = `SELECT sr.date, sr.records, sr.word, sr.word_id, wb.duration, wb.mastery, wb.date_created, wb.date_updated
                 FROM public.study_records sr INNER JOIN public.wordbank wb
                 ON sr.word_id = wb.word_id
                 WHERE student='${id}' AND course='${course}'
                 ORDER BY sr.id`
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}))
module.exports = router
