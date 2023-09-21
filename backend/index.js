const express = require('express');
const cors = require("cors");
const db = require('./config/mongoose');
const port = 8000;
const app=express();
app.use(express.json());
const User = require("./models/user");
app.use(cors());
app.get("/gett",function(req,res){
    res.send("running!!!");
    //console.log(req);
});


app.post('/gets', async (req, res) => {
    try {
        console.log(req.body); // Log the request body
        res.status(200).json({ message: 'Data received successfully' }); // Respond to the client
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