const express = require('express');
const cors = require("cors");
const db = require('./config/mongoose');
const port = 8004;
const app=express();
app.use(express.json());
const User = require("./models/user");
app.use(cors());
app.get("/gett",function(req,res){
    res.send("running!!!");
    //console.log(req);
});
/*
const create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email})
.then((user)=>{
        if(!user){
            User.create(
                req.body
            )
          .then((user) => {
            console.log("created");
            return res.redirect('/users/signin');
          })
          .catch((err) => {
            console.log("error in signing up",err);
            return;
          });
        }
        else{
            return res.redirect('back');
        }
    })
    .catch((err) => {
            console.log("error in finding user in signing up");
            return;
          });
};



app.post('/gets', async (req, res) => {
    try {
        
        console.log(req.body); // Log the request body
        res.status(200).json({ message: 'Data received successfully' }); // Respond to the client
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
},create);

*/
const create = async (req, res) => {
    console.log("HH");
    try {
      if (req.body.password !== req.body.confirm_password) {
        return res.status(400).json({ message: "Password and confirm_password do not match" });
      }
  
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
  
      const newUser = new User({
        name: req.body.user_name,
        email: req.body.email,
        pincode: req.body.pincode,
        password: req.body.password,
      });
      console.log("User created");

      await newUser.save(); // Save the new user to the database
  
      console.log("User created");
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error in user creation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };



  app.post('/gets', async (req, res) => {
    try {
      console.log(req.body); // Log the request body
      await create(req, res); // Call the create function to create the user
    //  res.status(200).json({ message: 'Data received and user created successfully' }); // Respond to the client
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


app.listen(port,function (err){
    if(err){
        console.log("error in running the server",error);
    }
    else{
        console.log("running!!");
    }
})