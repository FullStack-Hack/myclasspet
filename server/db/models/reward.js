const Sequelize = require('sequelize')
const db = require('../db')

const Reward = db.define('reward', {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    cost: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue:
          'https://lh3.googleusercontent.com/proxy/9CCNJCJQ7AKrRjHdNXwXNotDH84JE1DXiw8_WUxBPTlRwPPoZpnW9UTmViS_h8cPyg_ExMOZg_1UUXWH1_ealDt0qwunV20'
      }
  })

  Reward.beforeCreate(reward => {
    if (reward.imageUrl === '') {
      reward.imageUrl =
        'https://lh3.googleusercontent.com/proxy/9CCNJCJQ7AKrRjHdNXwXNotDH84JE1DXiw8_WUxBPTlRwPPoZpnW9UTmViS_h8cPyg_ExMOZg_1UUXWH1_ealDt0qwunV20'
    }
  })

module.exports = Reward