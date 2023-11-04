// polls.js
const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: String,
    options: [{ text: String, votes: Number }],
    
});

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;
