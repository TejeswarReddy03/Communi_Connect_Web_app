const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){

    Post.findById(req.body.post)
    .then((post)=>{
        if(post){

            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            })
            .then ((comment)=>{
                post.comments.push(comment);
                post.save();
    

                res.redirect('/');
            })
            .catch((err)=>{
                console.log("err",err);
                    return;
            });

        }
    })

    .catch((err)=>{
        console.log(err);
            return;
    });


    
    

}


module.exports.destroy = function(req,res){
    Comment.findById(req.params.id)
    .then((comment) => {
       
        // .id means converting the object id into string i.e, _id gives object
       if(comment.user == req.user.id){
        // fetch post and go into it and delete it
        let postId = comment.post;
        comment.deleteOne();
        
        Post.findByIdAndUpdate(postId,{ $pull:{comments: req.params.id}})
        .then(()=>{
            return res.redirect("back");
        })
        .catch((err)=>{
            console.log("err");
            return;
        });






       }
       else{
        return res.redirect('back');
       }
    })
    .catch((err) => {
      console.log('error in deleting an object in database',err);
      return;
    });
}