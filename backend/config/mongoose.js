const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Load dotenv package

/*
mongoose.connect('mongodb://127.0.0.1:27017/communi', {
    useNewUrlParser: true,
  });
*/
dotenv.config();
mongoose.connect(process.env.MONGODB);


const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;