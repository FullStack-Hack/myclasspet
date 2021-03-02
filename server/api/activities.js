const router = require("express").Router();
const { Activity } = require("../db/models");

//GET all activities
router.get("/", async (req, res, next) => {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

//POST one activity
router.post("/", async (req, res, next) => {
  try {
    const { name, description, timeLength, points, imageUrl } = req.body;
    const newActivity = await Activity.create({
      name,
      description,
      timeLength,
      points,
      imageUrl,
    });
    res.send(newActivity);
  } catch (error) {
    next(error);
  }
});

//GET one activity by Id
router.get("/:activityId", async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.activityId);
    res.json(activity);
  } catch (error) {
    next(error);
  }
});

//DELETE one activity by Id
router.delete("/:activityId", async (req, res, next) => {
  try {
    await Activity.destroy({
      where: {
        id: req.params.activityId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
