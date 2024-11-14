require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

const User = new mongoose.Schema({
  username: String,
  useremail: String,
  password: String,
});

const todo = new mongoose.Schema({
  todos: [
    {
      task: { type: String, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});


const usermodel = mongoose.model("users", User);
const todomodel = mongoose.model("todos", todo);

module.exports = {
  todomodel,
  usermodel,
};
