const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },


},{
    timestamps: true
});

const Post = mongoose.model('post',postSchema);
module.exports = Post;