const Sequelize = require("sequelize");
const db = require("../db");

const Activity = db.define("activity", {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  start: {
    type: Sequelize.DATE,
  },
  end: {
    type: Sequelize.DATE,
  },
  points: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://lh3.googleusercontent.com/proxy/9CCNJCJQ7AKrRjHdNXwXNotDH84JE1DXiw8_WUxBPTlRwPPoZpnW9UTmViS_h8cPyg_ExMOZg_1UUXWH1_ealDt0qwunV20",
  },
});

Activity.beforeCreate((activity) => {
  if (activity.imageUrl === "") {
    activity.imageUrl =
      "https://lh3.googleusercontent.com/proxy/9CCNJCJQ7AKrRjHdNXwXNotDH84JE1DXiw8_WUxBPTlRwPPoZpnW9UTmViS_h8cPyg_ExMOZg_1UUXWH1_ealDt0qwunV20";
  }
});

module.exports = Activity;
