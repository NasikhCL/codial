const Comment = require('../models/comment');
const Post = require('../models/post')

module.exports.create = function(req,res){

Post.findById(req.body.post, function(err,post){
    if(err){
        console.log('eerror in line 8');
    }
    if(post){
        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }, function(err,comment){
            // handdle err
            if(err){
                console.log('error creating comment');
            }

            post.comments.push(comment)
            post.save();
 
            res.redirect('/');
        })
    }
});

}




// value="62bd8a73bf93c66776a85384"