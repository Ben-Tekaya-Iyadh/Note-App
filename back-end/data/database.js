const { MongoClient } = require("mongodb");
const chalk = require("chalk");
require("dotenv").config();

const MongoUri = process.env.MONGO_URI;
let db;

const mongoConnect = async callback => {
  console .log(MongoUri)
  const database = MongoClient.connect(MongoUri)
    .then(client => {
      console.log("MongoDB connected");
      callback && callback();
      return client.db();
    })
    .catch(err => {
      console.log("Error Connecting to db", err);
      return err;
    })

  return database
}

async function getDb() {
  db = await mongoConnect()
  if (db) {
    return db
  }
  throw new Error("No Database connection");
}

module.exports = { mongoConnect, getDb }
