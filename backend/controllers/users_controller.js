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
const nameofuser = req.user.name;
const idofuser = req.user.id;
const isitadmin=req.user.isAdmin;
const jsonData = { authstatus:1 ,email:emailofuser,password:req.user.password,pincode:pincodeofuser,name:nameofuser,id:idofuser,isAdmin:isitadmin};
// // Encode the JSON object as a query parameter
 const jsonDataEncoded = encodeURIComponent(JSON.stringify(jsonData));

// // Redirect to the target path with the JSON data as a query parameter
 return res.redirect(`/auth-success?data=${jsonDataEncoded}`);
 }


module.exports.destroySession=function(req,res){
    
    req.logout(function(err) {
        if (err) { console.log("err"); return next(err); 
       }
        console.log("logout called");
        //req.flash('success','Logged out Successfully');
       
     res.send('hi');
    });
 }