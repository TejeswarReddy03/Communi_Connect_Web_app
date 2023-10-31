const mongoose = require('mongoose');
const path = require('path');
const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required : true,
        unique : true

    },
    password: {
        type:String,
        required : true,
    },
    name: {
        type:String,
        required : true,
    },
    pincode: {
        type:String,
        required : true,
    },
    isAdmin: { type: Boolean, default: false },
    adminId: { type: String, default: null },


},{
    timestamps:true
});


const User = mongoose.model('User',userSchema);
module.exports = User;