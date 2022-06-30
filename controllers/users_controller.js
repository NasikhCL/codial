module.exports.profile= function (req,res) {
    return res.render('user_profile',{
        title: "home"
    });

}


// render the sign up page
module.exports.signUp = function(req,res) {
    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
    }
    
    
    return res.render('user_sign_up',{
        title: 'Codial | Sign Up'
    });
    
}

// render the sign in page
module.exports.signIn =function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
     }
    return res.render('user_sign_in',{
        title: 'Codial | Sign In'
    })
}
 
// get the signup data
module.exports.create = function(req,res){
    
    console.log(`password is ${req.body.password}`);
    console.log(`confirm password is ${req.body.confirmpassword}`)
    console.log(`confirm password is ${req.body.email}`)

    if(req.body.password != req.body.confirmpassword){ 
        console.log('password is not matching');
        return res.redirect('back');

    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log("error in finding user in signing up inside emailfine one");
            return;
        }  
        if(!user){ 
            User.create(req.body, function(err,user){
                if(err){
                console.log("error in finding user in signing up");
                return; 
            }
            return res.redirect('/users/sign-in');
            });
           
        }else{
            return res.redirect('back')
        }
    });
console.log('inside create page');
}  
 
// sign in and create a session for the user
module.exports.createSession= function(req, res){
    return res.redirect('/')
}

// sign out and kill session

module.exports.destroySession= function(req, res){
    
 req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
  
}
