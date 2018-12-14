// Router for student calls

const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const {connectDB, queryDB} = require('./common')

router.get('/', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const query = `SELECT * FROM public.students WHERE student_id='${id}'`
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}));

router.get('/all', asyncHandler(async (req, res) => {
  const query = "SELECT * FROM public.students"
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}));

router.get('/*', function(req, res) {
  // console.log(req.apiGateway.event.queryStringParameters)
  console.log(req.apiGateway.event.pathParameters.proxy)
  res.json({success: 'get call succeed!', url: req.url});
});


/** POST CALLS **/

router.post('/', asyncHandler(async (req, res) => {
  const queryData = req.body
  const student = {
    student_id: req.apiGateway.event.requestContext.identity.cognitoIdentityId,
    email : queryData.email,
    date_registered: new Date(),
    ethnicity: queryData.ethnicity,
    nationality: queryData.nationality,
    dob: queryData.dob,
    contact_num: queryData.contact_num,
    ielts: queryData.ielts,
    toefl: queryData.toefl,
    languages: queryData.languages,
    gender: queryData.gender,
    ctnum: queryData.ctnum,
    classcode: queryData.classcode,
    name: queryData.name
  }

  const query = {
    text: `INSERT INTO public.students(
          student_id, email, date_registered, ethnicity, nationality, dob, contact_num, ielts, toefl, languages, gender, ctnum, classcode, name)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
    values: Object.values(student)
  }

  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}));

//
//
// /** PUT CALLS **/
router.put('/', asyncHandler(async (req, res) => {
  const queryData = req.body
  const student_id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  let updateString = ''
  for (let key in queryData) {
    if (updateString == '') {
      updateString += `${key}='${queryData[key]}'`
    } else {
      updateString += `, ${key}='${queryData[key]}'`
    }
  }
  const query = {
    text: `UPDATE public.students
          SET ${updateString}
          WHERE student_id=$1`,
    values: [student_id]
  }
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}));


/** DELETE CALLS **/
router.delete('/', asyncHandler(async (req, res) => {
  const student_id = req.apiGateway.event.queryStringParameters.student_id
  const query = {
    text: `DELETE FROM public.students
          WHERE student_id=$1`,
    values: [student_id]
  }
  console.log(query)
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}));


module.exports = router
