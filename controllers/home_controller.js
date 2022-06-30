const Post = require('../models/post')
module.exports.home = function(req,res) {
// console.log(req.cookies);
// res.cookie('somthing', 'blah')
    Post.find({},function(err,posts){
        if(err){console.log("erro in loading posts"); return;}
        return res.render('home',{
            title: "codia | home",
            posts: posts
        });

    })

   
    // return res.end('<h1> express is up for codial</h1>');
    
}   