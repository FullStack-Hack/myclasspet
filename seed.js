const { green, red } = require("chalk");
const db = require("./server/db");
const { Student, Teacher, Reward, Activity } = require("./server/db/models");

const students = [
  {
    email: "cody@mail.com",
    firstName: "cody",
    lastName: "thePug",
  },
  {
    email: "murphy@mail.com",
    firstName: "murphy",
    lastName: "otherDog",
  },
  {
    email: "tomnook@mail.com",
    firstName: "tom",
    lastName: "nook",
  },
];
const activities = [
  {
    name: "math",
    description: "2+2",
    timeLength: 60,
    points: 1,
  },
  {
    name: "reading",
    description: "jack and jill went up the hill",
    timeLength: 60,
    points: 1,
  },
  { name: "exercise", description: "run", timeLength: 30, points: 1 },
];
const rewards = [
  {
    name: "donut",
    description: "you get to eat a donut",
    cost: "5",
  },
  {
    name: "youtube video",
    description: "you get to watch a youtube video",
    cost: "5",
  },
  { name: "coloring", description: "you get to draw a picture", cost: "5" },
];
const teachers = [
  {
    email: "teacher@mail.com",
    firstName: "miss",
    lastName: "frizzle",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      students.map((student) => {
        return Student.create(student);
      })
    );
    await Promise.all(
      activities.map((activity) => {
        return Activity.create(activity);
      })
    );
    await Promise.all(
      rewards.map((reward) => {
        return Reward.create(reward);
      })
    );
    await Promise.all(
      teachers.map((teacher) => {
        return Teacher.create(teacher);
      })
    );
  } catch (error) {
    console.log(red(error));
  }
};
module.exports = seed;
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}