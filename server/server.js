const express = require("express");
const jwt = require("jsonwebtoken");
const { usermodel, todomodel } = require("./db.js");
const bcryptjs = require("bcryptjs");
const app = express();
app.use(express.json());

function auth(req,res,next){
  const token = req.headers['token'];
  if (!token) {
    return res.status(401).send('Token required');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    
    req.userinfo = decoded;
    next();
  });
}


app.get("/login", async (req, res) => {
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

  res.send("filtered user");
});

app.post("/signup", async (req, res) => {
  try {
    let { username, useremail, password } = req.body;
    if(!(username && useremail && password)){
      return res.status(400).send("All fields are required")
    }else{
    console.log(username, useremail, password);
    password = bcryptjs.hashSync(password, 10);
    
    await usermodel.create({ username, useremail, password });
    const user = await usermodel.findOne({ useremail: useremail });

    await todomodel.create({ todos: [], userid: user._id });
    console.log("User successfully signed up");
    res.status(200);
  } 


  } catch (e) {
  
    console.log("Error in signup block ", e);
  }
  res.send("Signup done");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/gettodos",auth, async (req,res)=>{

const user = await usermodel.findOne({useremail:req.userinfo})
const todos = await todomodel.findOne({userid:user._id})
res.json({
  user,todos
})
})

app.post("/addone", auth, async (req, res) => {
  try {
    const data = req.body.data;
    const user = await usermodel.findOne({ useremail: req.userinfo }); 

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const result = await todomodel.findOneAndUpdate(
      { userid: user._id }, 
      { $set: { todos: data } }, 
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ message: 'Todos not found' });
    }

    res.status(200).send({ message: 'Todos updated successfully', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating todos' });
  }
});
