const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://storagedrive344:Himu%40backend@cluster0.jszpd.mongodb.net/");
//dont know why but .env variables arent working for me here,  so i hardcoded all the variables here
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
