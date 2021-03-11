const Student = require("./student");
const Teacher = require("./teacher");
const Activity = require("./activity");
const Reward = require("./reward");

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Teacher.hasMany(Student);
// Activity.belongsToMany(Student);
Reward.belongsToMany(Student, {
  through: "students_rewards",
});
Student.belongsToMany(Reward, {
  through: "students_rewards",
});
Student.hasMany(Activity);
// Student.hasMany(Reward);
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Teacher,
  Student,
  Activity,
  Reward,
};
