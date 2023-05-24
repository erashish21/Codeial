const Post = require('../models/post');
const Like = require('../models/like');
const Comment = require('../models/comment');
const { post } = require('../routes');

module.exports.create =async function(req , res){
    try{
        await Post.create({
            content : req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                date:{
                    post:post
                },
                message:'Post created!'
            });
        }
        req.flash('success','Post published');
        return res.redirect('back');

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
   
}


module.exports.destroy = async function(req , res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});


            post.remove();
           await Comment.deleteMany({post:req.params.id});
           req.flash('success', 'Post and associated comments deleted!');
           return res.redirect('back');
          
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error',err);
        return;
    }
}
  
