const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");
// moved from server/db/db.js to account for use of db or db-test
// process.env.DATABASE_URL = `postgres://localhost:5432/${databaseName}`;

// const db = new Sequelize(process.env.DATABASE_URL, {
//   logging: false,
// });

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false,
    operatorAliases: false,
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: process.env.DATABASE_URL && {
        require: true
      }
    }
  }
)

module.exports = db;
