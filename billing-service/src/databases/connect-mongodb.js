const mongoose = require("mongoose");
const chalk = require("chalk");
const {
  db: { host, name, port },
} = require("../configs/mongodb");

const connectString =
  process.env.MONGODB_URL || `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) =>
        console.log(
          chalk.bold.greenBright(
            `Connect to mongodb: ${connectString} successfully`
          )
        )
      )
      .catch((err) =>
        console.log(
          chalk.bold.redBright(
            `Connect to mongodb: ${connectString} failed: ${err}`
          )
        )
      );
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const mongoDB = Database.getInstance();
module.exports = mongoDB;
