const mongoose = require('mongoose');
const path = require('path');

const announcementSchema = new mongoose.Schema({
    announcement: {
        type:String,
        required : true,
        

    },
   
    pincode: {
        type:String,
        required : true,
    },



},{
    timestamps:true
});

const Announcements = mongoose.model('Announcements',announcementSchema);
module.exports = Announcements;