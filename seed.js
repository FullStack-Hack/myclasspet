const { green, red } = require("chalk");
const db = require("./server/db");
const { Student, Teacher, Reward, Activity } = require("./server/db/models");

const students = [
  {
    email: "cody@mail.com",
    password: "1234",
    firstName: "cody",
    lastName: "thePug",
    points: 10,
    isAdmin: false,
  },
  {
    email: "murphy@mail.com",
    password: "1234",
    firstName: "murphy",
    lastName: "otherDog",
    points: 4,
    isAdmin: false,
  },
  {
    email: "tomnook@mail.com",
    password: "1234",
    firstName: "tom",
    lastName: "nook",
    isAdmin: true,
  },
];
const activities = [
  {
    title: "math",
    description: "2+2",
    start: new Date("March 11, 2021 02:24:00").toISOString(),
    end: new Date("March 11, 2021 03:24:00").toISOString(),
    points: 7,
  },
  {
    title: "reading",
    description: "jack and jill went up the hill",
    start: new Date("March 11, 2021 01:24:00").toISOString(),
    end: new Date("March 11, 2021 2:30:00").toISOString(),
    points: 15,
  },
  {
    title: "exercise",
    description: "run",
    start: new Date("March 11, 2021 15:30:00").toISOString(),
    end: new Date("March 11, 2021 16:35:00").toISOString(),
    points: 3,
  },
];
const rewards = [
  {
    name: "Video Games",
    description: "Play video games for an hour",
    cost: "10",
    imageUrl:
      "https://image.freepik.com/free-vector/icon-gamepad-play-arcade-video-game-gamer-custom-designcartoon-illustration_185390-205.jpg",
  },
  {
    name: "Playground",
    description: "Visit the playground for an hour",
    cost: "5",
    imageUrl:
      "https://media.istockphoto.com/vectors/kids-playground-equipment-vector-id628557920?k=6&m=628557920&s=612x612&w=0&h=VOgKLXv82h51lSB3VdB55f9vwoXn0OJcJxPjxCzhtKQ=",
  },
  {
    name: "Ice Cream",
    description: "Buy your favorite ice-cream",
    cost: "7",
    imageUrl:
      "https://i.pinimg.com/originals/e5/22/fa/e522fa1d1e7ca2e488c35b3af0e313ab.jpg",
  },
];
const teachers = [
  {
    email: "teacher@mail.com",
    password: "1234",
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
