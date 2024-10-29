const user = require('../models/user.js');
module.exports.rendersignup = (req,res)=>{
    res.render('users/signup.ejs');
}
module.exports.signup =async(req,res)=>{
    try{
     let {username,email,password} = req.body;
     const newuser = new user({email,username});
     const reg_user = await user.register(newuser,password);
     console.log(reg_user);
     req.login(reg_user,(err)=>{
         if(err){
             return next(err);
         }
         req.flash('success','You successfully logged in');
         res.redirect('/listings');
     })
    }catch(e){
     req.flash('error',e.message);
     res.redirect('/user/signup');
    }
 }

 module.exports.login  = async(req,res)=>{
    req.flash('success' , 'welcome to wanderlust you ae loggiedin');
    if(res.locals.url){
        return res.redirect(res.locals.url);
    }res.redirect('/listings');
    
};


module.exports.renderlogin = (req,res)=>{
    res.render('users/login.ejs');
}
module.exports.logout= (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err); 
        }
        req.flash('success','You successfully logged out');
        res.redirect('/listings');
    })
}
