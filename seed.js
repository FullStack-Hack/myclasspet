const { green, red } = require("chalk");
const db = require("./server/db");
const { Student, Teacher, Reward, Activity } = require("./server/db/models");

const students = [
  {
    email: "cody@mail.com",
    password: '1234',
    firstName: "cody",
    lastName: "thePug",
  },
  {
    email: "murphy@mail.com",
    password: '1234',
    firstName: "murphy",
    lastName: "otherDog",
  },
  {
    email: "tomnook@mail.com",
    password: '1234',
    firstName: "tom",
    lastName: "nook",
  },
];
const activities = [
  {
    title: "math",
    description: "2+2",
    start: new Date("March 4, 2021 02:24:00").toISOString(),
    end: new Date("March 4, 2021 03:24:00").toISOString(),
    points: 1,
  },
  {
    title: "reading",
    description: "jack and jill went up the hill",
    start: new Date("March 4, 2021 01:24:00").toISOString(),
    end: new Date("March 4, 2021 01:30:00").toISOString(),
    points: 1,
  },
  {
    title: "exercise",
    description: "run",
    start: new Date("March 4, 2021 03:30:00").toISOString(),
    end: new Date("March 4, 2021 03:35:00").toISOString(),
    points: 1,
  },
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
    password: '1234',
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

    //connecting students to activities
    const student1 = await Student.findByPk(1);
    for (let i = 0; i < activities.length; i++) {
      const activity = await Activity.findByPk(i + 1);
      await student1.addActivity(activity);
    }
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
