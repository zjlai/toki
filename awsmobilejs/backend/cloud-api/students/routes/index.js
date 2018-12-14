const router = require('express').Router()

router.use('/students', require('./students'))
router.use('/courses', require('./courses'))
module.exports = router
