const mongoose = require('mongoose');

const Pollsschema = new mongoose.Schema({
  formLink: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  
  isClosed: {
    type: Boolean,
    default: false,
  },
},{
    timestamps:true
});

const Polls = mongoose.model('Polls', Pollsschema);

module.exports = Polls;
