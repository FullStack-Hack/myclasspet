const router = require("express").Router();
const { Reward } = require("../db/models");

//GET all rewards
router.get("/", async (req, res, next) => {
    try {
        const rewards = await Reward.findAll();
        res.json(rewards);
    } catch (error) {
        next(error);
    }
});

//POST one reward
router.post("/", async (req, res, next) => {
    try {
        const { name, description, cost, imageUrl } = req.body;
        const newReward = await Reward.create({
            name,
            description,
            cost,
            imageUrl,
        });
        res.send(newReward);
    } catch (error) {
        next(error);
    }
});

//GET one reward by Id
router.get('/:rewardId', async (req, res, next) => {
    try {
        const reward = await Reward.findByPk(req.params.rewardId)
        res.json(reward)
    } catch (error) {
        next(error)
    }
})

//DELETE one reward by Id
router.delete('/:rewardId', async (req, res, next) => {
    try {
        await Reward.destroy({
            where: {
                id: req.params.rewardId
            }
        })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

//DELETE one reward by Id
router.post("/:rewardId", async (req, res, next) => {
    try {
        console.log("REWARD REQ:", req.body, "REWARD PARAM", req.params.rewardId)
    } catch (error) {
        next(error)
    }
  });

module.exports = router;
