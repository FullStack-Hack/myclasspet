const router = require("express").Router();
const { Student, Activity } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const students = await Student.findAll({
      attributes: ["id", "email", "firstName", "lastName"],
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    res.json(student);
  } catch (error) {
    next(error);
  }
});

router.get("/:studentId/activities", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId, {
      include: Activity,
    });
    res.json(student);
  } catch (error) {
    next(error);
  }
});
