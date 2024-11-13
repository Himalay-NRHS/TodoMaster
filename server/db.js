require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

const User = new mongoose.Schema({
  username: String,
  useremail: String,
  password: String,
});

const todo = new mongoose.Schema({
  todos: [String],
  userid: { type: mongoose.Schema.Types.ObjectId },
});

const usermodel = mongoose.model("users", User);
const todomodel = mongoose.model("todo", todo);

module.exports = {
  todomodel,
  usermodel,
};
