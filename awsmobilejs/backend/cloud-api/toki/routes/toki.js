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
    date:new Date(),
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
module.exports = router
