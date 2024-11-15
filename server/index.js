const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const { usermodel, todomodel } = require("./db.js");
const bcryptjs = require("bcryptjs");
const app = express();
app.use(cors()); 
app.use(express.json());
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).send('Token required');
  }

  jwt.verify(token, 
    'ntg', (err, decoded) => {
    if (err) {
      console.log("JWT Verification Error:", err); // Detailed error message
      return res.status(403).send('Invalid token');
    }

    req.userinfo = decoded;
    next();
  });
}

app.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  const user = await usermodel.findOne({ useremail: email });
  if (!user) {
    console.log("error while finding that specific user");
    res.send(405)
  } else if (user) {
    const ismatch = bcryptjs.compareSync(pass, user.password);
    console.log(ismatch ? 'Password is correct!' : 'Invalid password');

    if(ismatch){


      const token = jwt.sign(user.useremail, 'ntg');
      res.json({
        id : user._id,
        token:token
      })
    }else{
      res.status(405)
    }
  } else {
    console.log("User isn't registered");
  }

});

app.post("/signup", async (req, res) => {
  try {
    let { username, useremail, password } = req.body;
    if (!(username && useremail && password)) {
      return res.status(400).send("All fields are required");
    } else {
      console.log(username, useremail, password);

      password = bcryptjs.hashSync(password, 10);

      await usermodel.create({ username, useremail, password });

      const user = await usermodel.findOne({ useremail: useremail });

      await todomodel.create({
        todos: [],
        userid: user._id
      });

      console.log("User successfully signed up");

      // Respond with success
      return res.status(200).send("Signup successful");
    }
  } catch (e) {
    console.log("Error in signup block ", e);
    res.status(500).send("Error during signup");
  }
});


app.post("/addone", auth, async (req, res) => {
  try {
    console.log("addone called")
    const user = await usermodel.findOne({ useremail: req.userinfo });
    const todo = await todomodel.findOne({ userid: user._id });
    const result = await todomodel.findOneAndUpdate({ userid: user._id },{$push: { todos: { task: req.body.task, completed: false } } }, { new: true });

    res.status(200).send({ message: 'Todos updated successfully', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating todos' });
  }
});
app.get("/gettodos",auth, async (req,res)=>{
console.log("request came withh token ", req.userinfo)
  const user = await usermodel.findOne({useremail:req.userinfo})
  const todos = await todomodel.findOne({userid:user._id})
  const name= user.username
  res.json({
    user,todos,name
  })
  })

app.put("/update",auth, async (req,res)=>{
try{
  const newtask = req.body.task
  const taskid = req.body.taskid
  const check = req.body.completed
  const user = await usermodel.findOne({useremail:req.userinfo})
console.log("request came withh token ", req.userinfo ,newtask,taskid,check)
  const result = await todomodel.findOneAndUpdate({ userid: user._id, "todos._id": taskid },{$set: { "todos.$.task":newtask } ,$set:{"todos.$.completed":check}}, { new: true });
res.send(result)
}
catch(e){
  console.log("error in updatetodos  ",e)
}


})
app.put("/delete",auth, async (req,res)=>{
try{
  console.log("request came withh token in delete ")
  const taskid = req.body.taskid
  const user = await usermodel.findOne({useremail:req.userinfo})
  const result = await todomodel.findOneAndUpdate({ userid: user._id },{$pull: { todos: { _id: taskid } } }, { new: true });
res.send(result)
}
catch(e){
  console.log("error in updatetodos  ",e)
}})


module.exports = app; 