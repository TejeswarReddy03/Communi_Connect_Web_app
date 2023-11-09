const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User =require('../models/user');


passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        
        User.findOne({email:email})
     
        .then((user)=>{
           
            
                if(!user ||user.password != password){                
                    return done(null,false);
                } 
              
                    return done(null,user);
                
            })
            .catch((err) => {

                    return done(err);
                  });
        
    }


));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id)
     
    .then((user)=>{
           return done(null,user);
        })
        .catch((err) => {
                console.log("Error in finding the user ----> passport ");
                return done(err);
              });
});

passport.checkAuthentication = function(req,res,next){
    console.log("in check authentication")
    if(req.isAuthenticated()){
        console.log("not authenticated")
        return next();
    }
    res.status(302).header('Location', '/').end();
}
passport.setAuthenticatedUser = function(req,res,next){
 // console.log("in set authenticated user",req.user);

    if(req.isAuthenticated()){
      //  console.log("in set authenticated user in authenticate",req.user);
        res.locals.user=req.user;
    }
   // console.log(next);
    next();
}


module.exports=passport;