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
    res.json(student.activities);
  } catch (error) {
    next(error);
  }
});

router.post("/:studentId/activities", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    const activity = await Activity.create(req.body);

    await student.addActivity(activity);

    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    await student.save();
    res.send(student);
  } catch (error) {
    next(error);
  }
});

router.delete("/:studentid", async (req, res, next) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.studentid,
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
