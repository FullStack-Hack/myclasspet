const router = require('express').Router();
const { Student } = require("../db/models");

router.get('/me', async (req, res, next) => {
    try {
        if(!req.session.userId) {
            res.sendStatus(401)
        } else {
            const student = await Student.findById(req.session.userId)
            if (!student) {
                res.sendStatus(401)
            } else {
                res.json(student)
            }
        }
    } catch (error) {
        next(error)
    }
})

router.put("/login", async (req, res, next) => {
  console.log("ASLD;AFNSDLVKASD;LEWOIAFN")
  try {
    const student = await Student.findOne({where: {email: req.body.email}})
    if (!student) {
      console.log('No such student found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!student.password) {
      console.log('Student does not have a password:', req.body.email)
      res.status(401).send('Account activation is required. Please contact us.')
    } else if (!student.correctPassword(req.body.password)) {
      console.log('Incorrect password for student:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(student, err => (err ? next(err) : res.json(student)))
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', (req, res) => {
    delete req.session.studentId;
    res.sendStatus(204)
})

module.exports = router;
