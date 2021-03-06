const router = require('express').Router()

router.use('/students', require('./students'))
router.use('/activities', require('./activities'))
router.use('/rewards', require('./rewards'))
router.use('/auth', require('./auth'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router