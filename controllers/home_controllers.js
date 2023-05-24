const Post = require('../models/post');
const User  = require('../models/user');
const { post } = require('../routes');

module.exports.home = async function(req , res){
try{
    let post = await Post.find({})
    .populate('user')
    .populate({
     path: 'comments',
      populate:{
       path:'user'
     }
   });

   let users = await User.find({});
   
       return res.render('home',{
           title:"Codeial | Home",
           post:post,
           all_users:users
           
       });

       }catch(err){
         console.log('Error',err);
          return;

   }   
}

//module.exports.actionName = function(req , res){}