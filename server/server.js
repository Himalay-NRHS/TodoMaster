const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const { usermodel, todomodel } = require("./db.js");
const bcryptjs = require("bcryptjs");
const app = express();
app.use(cors()); 
app.use(express.json());
function auth(req, res, next) {
  console.log("auth called")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("Extracted Token:", token); // Debugging line
  
  if (!token) {
    return res.status(401).send('Token required');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
  } else if (user) {
    const ismatch = bcryptjs.compareSync(pass, user.password);
    console.log(ismatch ? 'Password is correct!' : 'Invalid password');

    if(ismatch){


      const token = jwt.sign(user.useremail, process.env.JWT_SECRET);
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

      // Hash the password before storing it
      password = bcryptjs.hashSync(password, 10);

      // Create the user in the database
      await usermodel.create({ username, useremail, password });

      // Retrieve the user to get their _id
      const user = await usermodel.findOne({ useremail: useremail });

      // Correct the todo object creation
      await todomodel.create({
        todos: [{ task: "ntg", completed: false }],
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

app.listen(3000,()=>{
  console.log("port running on 3000")
})