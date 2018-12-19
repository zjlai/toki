// Router for student calls

const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const {connectDB, queryDB} = require('./common')


const getWordsCount = async (course) => {
  const query = `SELECT COUNT(*) FROM public.words
                 WHERE course='${course}'`
  const conn = await connectDB()
  const res = await queryDB(conn, query)
  return res[0].count
}
const insertStudentStats = async (student, course) => {
  const wordCount = await getWordsCount(course)
  const query = `INSERT INTO public.student_stats (student, course, mastery, words_mastered, words_learning, words_total)
                 SELECT '${student}', '${course}', 0, 0, 0, ${wordCount}
                 WHERE NOT EXISTS
                  (SELECT * FROM public.student_stats WHERE student='${student}' AND COURSE='${course}')`
  console.log('insert: ', query)
  const conn = await connectDB()
  await queryDB(conn, query)
}

const chkSubscribe = async (student, course) => {
  const query = `SELECT COUNT(*) FROM public.subscriptions sub
                 INNER JOIN public.students stud
                 ON sub.student = stud.student_id OR sub.classcode = stud.classcode
                 WHERE sub.course='${course}'`
  let conn = await connectDB()
  let count = await queryDB(conn, query)
  if (count[0].count > 0) {
    await insertStudentStats(student, course)
  }
  return count[0].count
}

const getOneCourse = async (student) => {
  console.log('student: ', student)
  query = `SELECT COUNT(*), sub.course FROM public.subscriptions sub
           INNER JOIN public.students stud
           ON sub.student = stud.student_id OR sub.classcode = stud.classcode
           WHERE stud.student_id = '${student}'
           GROUP BY sub.course`
  const conn = await connectDB()
  const courses = await queryDB(conn, query)
  return { 'count': courses[0].count, 'course': courses[0].course }
}

router.get('/', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const query = `SELECT * FROM public.courses`
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}));

router.get('/mycourse', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  let course = req.apiGateway.event.queryStringParameters.course
  if ( course === '' ) {
    const getCourse = await getOneCourse(id)
    if (getCourse.count === 0) {
      res.json({msg: 'No Course'})
    } else {
      course = getCourse.course
    }
  }
  const check = await chkSubscribe(id, course)
  if (check === 0) {
    res.json({msg: 'Not Subscribed'})
  }
  query = `SELECT course.course_id, course.code, sub.classcode, ctnum, course.name, description, end_date, wordcount, teacher.first_name, teacher.last_name, next_cycle
            FROM public.subscriptions sub INNER JOIN public.students stud on sub.student = stud.student_id OR sub.classcode = stud.classcode
            INNER JOIN public.courses course on sub.course = course.course_id
            INNER JOIN public.teachers teacher on course.teacher_id = teacher.teacher_id
            INNER JOIN public.student_stats stats on stud.student_id = stats.student AND course.course_id = stats.course
            WHERE course.course_id='${course}' and stud.student_id='${id}'`

  console.log(query)
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}))

router.get('/mycourses', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  // const course = req.apiGateway.event.queryStringParameters.course
  query = `SELECT course.course_id, course.code, sub.classcode, ctnum, course.name, description, end_date, wordcount, teacher.first_name, teacher.last_name
           FROM public.subscriptions sub INNER JOIN public.students stud on sub.student = stud.student_id OR sub.classcode = stud.classcode
           INNER JOIN public.courses course on sub.course = course.course_id
           INNER JOIN public.teachers teacher on course.teacher_id = teacher.teacher_id
           WHERE stud.student_id='${id}'
          `
  // ORDER BY next_cycle DESC NULLS FIRST
  console.log(query)
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}));

router.post('/join', asyncHandler(async (req, res) => {
  console.log(req)
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const courseid = req.body.course_id
  let query = `SELECT row_id FROM public.subscriptions where student='${id}' AND course='${courseid}'`
  let conn = await connectDB()
  let result = await queryDB(conn, query)
  if ( result.length > 0) {
    console.log(result)
    res.json({ status: 'invalid', message: 'Student is already enrolled'})
  } else {
    const subscription = {
      student: id,
      course: courseid,
      timestamp: new Date()
    }
    query = {
      text: `INSERT INTO public.subscriptions(
            student, course, timestamp)
            VALUES($1, $2, $3)`,
      values: Object.values(subscription)
    }
    console.log(query)
    conn = await connectDB()
    result = await queryDB(conn, query)
    console.log(result)
    query = `UPDATE public.courses SET studentcount = studentcount + 1
            WHERE course_id='${courseid}'`
    conn = await connectDB()
    result = await queryDB(conn, query)
    console.log(result)
    res.json(({ status: 'success', message: 'Enrolled!'}))
  }
}));
router.get('/*', function(req, res) {
  // console.log(req.apiGateway.event.queryStringParameters)
  console.log(req.apiGateway.event.pathParameters.proxy)
  res.json({success: 'get call succeed!', url: req.url});
});

module.exports = router
