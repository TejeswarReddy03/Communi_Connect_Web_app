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

//   console.log("createSession called");
//     return res.redirect('/');

//console.log("the req in createsess",req);
const emailofuser=req.user.email;
const pincodeofuser=req.user.pincode;
const jsonData = { authstatus:1 ,email:emailofuser,pincode:pincodeofuser};
// // Encode the JSON object as a query parameter
 const jsonDataEncoded = encodeURIComponent(JSON.stringify(jsonData));

// // Redirect to the target path with the JSON data as a query parameter
 return res.redirect(`/auth-success?data=${jsonDataEncoded}`);
 }


module.exports.destroySession=function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','Logged out Successfully');

        res.redirect('/');
    });
 }