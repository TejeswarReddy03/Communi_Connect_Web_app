const User = require('../models/user');

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_signup',{
        title : "Codeial | Signup"
    });
}
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_signin',{
        title : "Codeial | Signin"
    });
}





module.exports.createSession=function(req,res){

  console.log("createSession called");
    return res.redirect('/');
 }


module.exports.destroySession=function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','Logged out Successfully');

        res.redirect('/');
    });
 }