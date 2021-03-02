const router = require('express').Router()
const {Student} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const students = await Student.findAll({
            attributes: [
                'id',
                'email',
                'firstName',
                'lastName',
            ]
        })
        res.json(students)
    } catch (error) {
        next(error)
    }
})