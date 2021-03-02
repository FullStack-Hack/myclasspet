const router = require('express').Router()
module.exports = router

router.use('/students', require('./students'))
router.use('/activities', require('./activities'))
router.use('/rewards', require('./rewards'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
