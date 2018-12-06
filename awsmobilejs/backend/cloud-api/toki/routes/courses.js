// Router for student calls

const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const {connectDB, queryDB} = require('./common')

router.get('/', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const query = `SELECT * FROM public.courses`
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}));

router.get('/mycourses', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const query = `SELECT course.course_id, course.code, sub.classcode, ctnum, course.name, description, end_date, wordcount, teacher.first_name, teacher.last_name
	               FROM public.subscriptions sub INNER JOIN public.students stud on sub.student = stud.student_id OR sub.classcode = stud.classcode
	               INNER JOIN public.courses course on sub.course = course.course_id
	               INNER JOIN public.teachers teacher on course.teacher_id = teacher.teacher_id`
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
