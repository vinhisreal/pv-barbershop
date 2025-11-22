const mongoose = require("mongoose");
const chalk = require("chalk");

async function connect(uri) {
  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log(chalk.cyan("✅ Connected MongoDB"));
}

module.exports = { connect };
