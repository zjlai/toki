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

const getNotConfidentBracketCount = async (student, course) => {
  const query = `
                SELECT count(*) FROM public.wordbank
                WHERE student='${student}' AND course='${course}'
                AND bracket='Not Confident'
                GROUP BY bracket
                `
  const conn = await connectDB()
  const count = await queryDB(conn, query)
  if (count.length === 0) {
    return 0
  }
  return count[0].count
}

const getTestWords = async (student, course) => {

  //Get Test words that need to be tested and returns list of words and count

  //Get Words from student wordbank
  const wordbankQuery = `
                        SELECT wb.word, wb.word_id, wb.mastery, wb.next_test, wb.bracket, ss.test_ready FROM public.wordbank wb
                        JOIN public.student_stats ss ON ss.student = wb.student AND ss.course=wb.course
                        WHERE wb.student='${student}' AND wb.course='${course}' AND ss.test_ready = true
                        AND ((wb.mastery <= 75 AND wb.next_test < current_timestamp) OR wb.bracket = 'None')
                        `
  const conn = await connectDB()
  const words = await queryDB(conn, wordbankQuery)
  // console.log(words)
  return words
}

const getNewWords = async (student, course) => {
  const newWordsQuery = `
                        SELECT word, word_id, definition, examples, images, breakdown, phonetics, complexity, category, oxdictdata FROM public.words wds
                        WHERE course='${course}'
                        EXCEPT
                        SELECT wds.word, wds.word_id, definition, examples, images,breakdown, phonetics, complexity, category, oxdictdata
                        FROM public.words wds
                        INNER JOIN public.wordbank wb
                        ON wb.word_id = wds.word_id
                        WHERE wb.student = '${student}' AND wb.course='${course}'
                        ORDER BY complexity LIMIT 20
                        `
  const test_ready = await getTestReady(student, course)
  console.log(test_ready)
  if (test_ready) {
    return []
  }
  const conn = await connectDB()
  const words = await queryDB(conn, newWordsQuery)
  // console.log(words)
  return words
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
const getTestReady = async (student, course) => {
  const query = `
                SELECT test_ready FROM public.student_stats
                WHERE student='${student}' AND course='${course}'
                `
  const conn = await connectDB()
  const res = await queryDB(conn, query)
  return res[0].test_ready
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

const getbracketlimit = async (student, course) => {
  const query = `
                SELECT bracketlimit, bracketbuffer FROM public.student_stats
                WHERE student='${student}' AND course='${course}'
                `
  const conn = await connectDB()
  const res = await queryDB(conn, query)
  return {
    limit: res[0].bracketlimit,
    buffer: res[0].bracketbuffer
  }
}
router.post('/endstudy', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const queryData = req.body
  const course = req.body.course

  await insertEndStudy(id, course)
  await updateAfterStudy(id, course)

  res.json({ status: 200 })
}))
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
  const limit = await getbracketlimit(id, course_id)
  const notConfidentCount = await getNotConfidentBracketCount(id, course_id)
  let newWords = await getNewWords(id, course_id)
  console.log(pace, words, limit, notConfidentCount, newWords)
  if (notConfidentCount > limit.limit + limit.buffer) {
    res.json([])
  } else {
    const maxNewWords = limit.limit + limit.buffer - notConfidentCount
    const newWordsCount = Math.min(maxNewWords, pace - notConfidentCount - words.length)
    if (newWordsCount < limit.buffer) {
      res.json([])
      return
    } else {
      res.json(newWords.slice(0, newWordsCount))
    }
  }
}));

router.post('/wordbank', asyncHandler(async (req, res) => {
  const student = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const queryData = req.body
  const cycle = await getCurrentTestCycle(student, queryData.course)
  const word = {
    student: student,
    course : queryData.course,
    word: queryData.word,
    word_id: queryData.word_id,
    cycle: cycle,
    bracket: 'None',
    duration: queryData.duration,
    mastery: 0,
    summary: '{}',
    date_created: new Date(),
    date_updated: new Date(),
    next_test: new Date()
  }
  const query = {
    text: `INSERT INTO public.wordbank(
          student, course, word, word_id, cycle, bracket, duration, mastery, summary, date_created, date_updated, next_test)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    values: Object.values(word)
  }

  const conn = await connectDB()
  const result = await queryDB(conn, query)
  const wordmap = await insertWordMap(student, queryData.course, queryData.word, queryData.word_id, queryData.wordmap)
  const record = await insertStudyRecord (student, queryData.course, queryData.word, queryData.word_id, queryData.records)
  res.json(result)
}));

const insertTestRecord = async (student, course, word, word_id, answer, result, duration, section) => {
  const cycle = await getCurrentTestCycle(student, course)
  const record = {
    student: student,
    course : course,
    date: new Date(),
    word: word,
    word_id: word_id,
    answer: answer,
    result: result,
    duration: duration,
    section: section,
    test_cycle: cycle
    // records: queryData.records || '{}'
  }
  const query = {
    text: `INSERT INTO public.test_records(
          student, course, date, word, word_id, answer, result, duration, section, test_cycle)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    values: Object.values(record)
  }
  const conn = await connectDB()
  const res = await queryDB(conn, query)
  return res
}

const insertTestRecordComments = async (student, course, comments) => {
  const cycle = await getCurrentTestCycle(student, course)
  const record = {
    student: student,
    course: course,
    date: new Date(),
    test_cycle: cycle,
    comments: `${comments} ${cycle}`
  }
  const query = {
    text: `INSERT INTO public.test_records(student, course, date, test_cycle, comments)
           VALUES($1, $2, $3, $4, $5)`,
    values: Object.values(record)
  }

  const conn = await connectDB()
  const res = await queryDB(conn, query)
  return res
}

const insertTestResult = async (student, course, records, duration, words, results) => {
  const cycle = await getCurrentTestCycle(student, course)
  const record = {
    student: student,
    course: course,
    date: new Date(),
    results: JSON.stringify(words),
    duration: duration,
    summary: JSON.stringify(records),
    test_cycle: cycle,
    score: results
  }
  const query = {
    text: `INSERT INTO public.test_results(student, course, date, results, duration, summary, test_cycle, score)
           VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: Object.values(record)
  }

  const conn = await connectDB()
  const res = await queryDB(conn, query)
  return res
}

const updateStudentStats = async (student, course, data) => {
  const ts = new Date()
  const query = `
                  UPDATE public.student_stats SET
                    mastery = ${data.mastery},
                    words_mastered = ${data.mastered},
                    next_cycle = '${data.next_cycle}',
                    test_cycle = '${data.test_cycle}',
                    updated = '${ts}'
                    test_ready = false
                `
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}

const getMetaSpeedStatsCorrect = async (student, course) => {
  const query = `
                SELECT percentile_cont(0.3) WITHIN GROUP (ORDER BY speed) AS lowerbound,
                       percentile_cont(0.7) WITHIN GROUP (ORDER BY speed) AS upperbound FROM
                (SELECT duration::float / len AS speed FROM
                (SELECT length(word) AS len, duration from public.test_records
                WHERE student='${student}' AND course='${course}' AND result) positives) stats
               `
  const conn = await connectDB()
  const stats = await queryDB(conn, query)
  return {
    lowerbound: stats[0].lowerbound,
    upperbound: stats[0].upperbound
  }
}

const getWordHistory = async (student, course, cycle) => {
  const query = `
                SELECT tr.word, tr.word_id, tr.duration, tr.result, tr.test_cycle, bracket FROM public.test_records tr
                JOIN public.wordbank wb ON wb.student=tr.student AND wb.course=tr.course AND wb.word_id=tr.word_id
                WHERE tr.student='${student}' AND tr.course='${course}' AND tr.word_id IS NOT NULL AND tr.test_cycle < ${cycle}
                ORDER BY word_id, date DESC
                `
  const conn = await connectDB()
  const history = await queryDB(conn, query)
  return history
}
const getCurrentTestCycle = async (student, course) => {
  const query = `
                  SELECT test_cycle FROM public.student_stats
                  WHERE student='${student}' AND course='${course}'
                `
  const conn = await connectDB()
  const testCycle = await queryDB(conn, query)
  return testCycle[0].test_cycle
}
const getCurrentTestWords = async (student, course, cycle) => {
  const query = `
                SELECT wb.row_id as wb_id, tr.id as tr_id, tr.word, tr.word_id, tr.answer, tr.duration, tr.result, wb.bracket FROM public.test_records tr
                JOIN public.wordbank wb ON wb.student=tr.student AND wb.course=tr.course AND wb.word_id=tr.word_id
                WHERE tr.student='${student}' AND tr.course='${course}' AND tr.test_cycle=${cycle}
                `
  const conn = await connectDB()
  const words = await queryDB(conn, query)
  return words
}
const computeWordMastery = async (student, course) => {
  const testCycle = await getCurrentTestCycle(student, course)
  const words = await getCurrentTestWords(student, course, testCycle)
  const history = await getWordHistory(student, course, testCycle)
  const speed = await getMetaSpeedStatsCorrect(student, course)
  const lowerSpeedLimit = speed.lowerbound
  const upperSpeedLimit = speed.upperbound
  const currentDT = new Date()
  const nextCycle = testCycle + 1
  const bracketDefs = ['None', 'Not Confident', 'Learning', 'Confident']
  words.forEach( word => {
    let bracket = ''
    let nextTest = new Date(currentDT)
    let wordHist = history.filter( hist => hist.word_id === word.word_id )
    let currentBracket = ''
    let wordSpeed = word.duration / word.word.length
    if (wordHist.length === 0) {  // If no previous record of word
      currentBracket = bracketDefs[0]
    } else if (wordHist.length > 0) {
      currentBracket = wordHist[0].bracket
    }
    // Get bucket for word
    if (word.result === false) {
      bracket = 'Not Confident'
      nextTest.setDate(nextTest.getDate() + 1)
    } else {
      if (wordSpeed <= lowerSpeedLimit) {
        // Student is familiar with word
        if (currentBracket === 'Confident') {
          bracket = 'Mastered'
          nextTest = NULL
        } else {
          bracket  = 'Confident'
          nextTest.setDate(nextTest.getDate() + 7)
        }
      } else if (wordSpeed > lowerSpeedLimit && wordSpeed <= upperSpeedLimit) {
        if (currentBracket === 'Confident') {
          bracket = 'Mastered'
          nextTest = NULL
        } else if (currentBracket === 'Learning') {
          bracket = 'Confident'
          nextTest.setDate(nextTest.getDate() + 7)
        } else {
          bracket = 'Learning'
          nextTest.setDate(nextTest.getDate() + 3)
        }
      } else if (wordSpeed > upperSpeedLimit) {
        if (currentBracket === 'Confident') {
          bracket  = 'Confident'
          nextTest.setDate(nextTest.getDate() + 7)
        } else if (currentBracket === 'Learning') {
          bracket = 'Confident'
          nextTest.setDate(nextTest.getDate() + 7)
        } else if (currentBracket === 'Not Confident') {
          bracket = 'Learning'
          nextTest.setDate(nextTest.getDate() + 3)
        } else {
          bracket = 'Not Confident'
          nextTest.setDate(nextTest.getDate() + 1)
        }
      }
    }
    word.bracket = bracket
    if (bracket === 'Confident') {
      word.mastery = 75
    } else if (bracket === 'Learning') {
      word.mastery = 50
    } else if (bracket === 'Not Confident') {
      word.mastery = 25
    }
    word.nextTest = `${nextTest.getUTCFullYear()}-${(nextTest.getUTCMonth() + 1).toString().padStart(2, '0')}-${nextTest.getUTCDate().toString().padStart(2, '0')} ${nextTest.getUTCHours().toString().padStart(2, '0')}:${nextTest.getUTCMinutes().toString().padStart(2, '0')}:${nextTest.getUTCSeconds().toString().padStart(2, '0')}.${nextTest.getUTCMilliseconds()}`
    word.cycle = testCycle
    word.updated = `${currentDT.getUTCFullYear()}-${(currentDT.getUTCMonth() + 1).toString().padStart(2, '0')}-${currentDT.getUTCDate().toString().padStart(2, '0')} ${currentDT.getUTCHours().toString().padStart(2, '0')}:${currentDT.getUTCMinutes().toString().padStart(2, '0')}:${currentDT.getUTCSeconds().toString().padStart(2, '0')}.${currentDT.getUTCMilliseconds()}`
  })
  console.log(words)
  await updateWordBankPostTest(words)
  await updateTestRecordsPostTest(words)

  return nextCycle
}

const updateWordBankPostTest = async (words) => {
  let wordValues = ''
  words.forEach( word => {
    wordValues += `(${word.tr_id}, 'Bracket: ${word.bracket}, Mastery: ${word.mastery}'), `
  })
  wordValues = wordValues.slice(0, -2)
  const query = `
                  UPDATE public.test_records as stats SET
                    comments = data.comments
                  FROM (VALUES
                    ${wordValues}
                  ) as data(id, comments)
                  WHERE data.id = stats.id
                `
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  return result
}

const updateTestRecordsPostTest = async (words) => {
  let wordValues = ''
  words.forEach( word => {
    wordValues += `(${word.wb_id}, '${word.bracket}', ${word.mastery}, ${word.cycle}, timestamp '${word.updated}', timestamp '${word.nextTest}'), `
  })
  wordValues = wordValues.slice(0, -2)
  const query = `
                  UPDATE public.wordbank as stats SET
                    bracket = data.bracket,
                    mastery = data.mastery,
                    cycle = data.cycle,
                    date_updated = data.updated,
                    next_test = data.next_test
                  FROM (VALUES
                    ${wordValues}
                  ) as data(id, bracket, mastery, cycle, updated, next_test)
                  WHERE data.id = stats.row_id
                `
  console.log(query)
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  return result
}

const processTestResults = async (student, course) => {
  const nextCycle = await computeWordMastery(student, course)
  //get next Cycle time
  return nextCycle
}

const getTotalTestDuration = async (student, course) => {
  const query = `
                SELECT sum(duration) FROM public.test_results
                WHERE student='${student}' AND course='${course}'
                GROUP BY course
                `
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  if (result.length === 0) {
    return 0
  }
  return result[0].sum
}

const getWordsStatusSummary = async (student, course) => {
  const query = `
                SELECT bracket, count(*), sum(duration) AS duration, sum(mastery) AS mastery FROM public.wordbank
                WHERE student='${student}' AND course='${course}'
                GROUP BY bracket
                `
  let mastered = 0
  let learning = 0
  let total = 0
  let mastery = 0
  let duration = 0
  const conn = await connectDB()
  const words = await queryDB(conn, query)

  words.forEach( word => {
    if (word.bracket === 'Mastered') {
      mastered += parseInt(word.count)
    } else {
      learning += parseInt(word.count)
    }
    total += parseInt(word.count)
    mastery += parseInt(word.mastery)
    duration +=parseInt(word.duration)
  })

  const testDuration = await getTotalTestDuration()
  duration += testDuration

  return {
    mastered,
    learning,
    total,
    mastery,
    duration
  }
}

const getNextCycleDate = async (student, course) => {
  const newWords = await getNewWords(student, course)
  const pace = await getPace(student, course)
  const newWordsCount = newWords.length
  let tsLimit = new Date()
  tsLimit.setDate(tsLimit.getDate() + 3)

  const ts = `${tsLimit.getUTCFullYear()}-${(tsLimit.getUTCMonth() + 1).toString().padStart(2, '0')}-${tsLimit.getUTCDate().toString().padStart(2, '0')} ${tsLimit.getUTCHours().toString().padStart(2, '0')}:${tsLimit.getUTCMinutes().toString().padStart(2, '0')}:${tsLimit.getUTCSeconds().toString().padStart(2, '0')}.${tsLimit.getUTCMilliseconds()}`
  const query = `
                SELECT next_test FROM public.wordbank
                WHERE student='${student}' AND course='${course}' AND next_test < '${ts}'::timestamp
                ORDER BY next_test
                `
  const conn = await connectDB()
  const nextCycles = await queryDB(conn, query)
  if (pace - nextCycles.length >= 0) {
    return nextCycles[nextCycles.length - 1].next_test
  } else {
    const idx = nextCycles.length - pace
    return nextCycles[idx - 1].next_test
  }
}
const updateStudentStatsPostTest = async (student, course, cycle) => {
  const wordStatus = await getWordsStatusSummary(student, course)
  const nextCycleDate = await getNextCycleDate(student, course)
  const ts = `${nextCycleDate.getUTCFullYear()}-${(nextCycleDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${nextCycleDate.getUTCDate().toString().padStart(2, '0')} ${nextCycleDate.getUTCHours().toString().padStart(2, '0')}:${nextCycleDate.getUTCMinutes().toString().padStart(2, '0')}:${nextCycleDate.getUTCSeconds().toString().padStart(2, '0')}.${nextCycleDate.getUTCMilliseconds()}`
  const query = `
                UPDATE public.student_stats SET
                  mastery=${wordStatus.mastery},
                  words_mastered=${wordStatus.mastered},
                  words_learning=${wordStatus.learning},
                  total_duration=${wordStatus.duration},
                  next_cycle='${ts}'::timestamp,
                  test_cycle=${cycle},
                  updated=current_timestamp(0),
                  test_ready=false
                WHERE student = '${student}' AND course = '${course}'
                `
  console.log(query)
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  return result
}
router.post('/recordstarttest', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const data = req.body

  const comments = `Started Test Cycle`
  const result = await insertTestRecordComments(id, data.course, comments)

  res.json(result)
}));

router.post('/testrecords', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const queryData = req.body

  const result = await insertTestRecord(id, queryData.course, queryData.word, queryData.word_id, queryData.answer, queryData.result, queryData.duration, queryData.section)

  res.json(result)
}));

router.post('/recordendtest', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const data = req.body
  const comments = `Ended Test Cycle`
  await insertTestRecordComments(id, data.course, comments)
  const result = await insertTestResult(id, data.course, data.records, data.duration, data.words, data.result)
  res.json(result)
}));

router.post('/processtest', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const course = req.body.course
  const nextCycle = await processTestResults(id, course)
  const update = await updateStudentStatsPostTest(id, course, nextCycle)
  //console.log(status)
  res.json({'status': update})
}))

router.get('/nextcycle', asyncHandler(async (req, res) => {
  const student = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const course = req.apiGateway.event.queryStringParameters.course

  const nextCycle = await getNextCycleDate(student, course)
  res.json(nextCycle)
}))

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
}));

module.exports = router
