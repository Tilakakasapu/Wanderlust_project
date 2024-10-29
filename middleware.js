const listing = require('./models/listing');
const Review = require('./models/reviews');
const ExpressError = require('./utils/Expresserror');

const {listingschema , reviewSchema} = require('./schema.js');
module.exports.isLoggedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash('error','you must be logged in to create a Listing');
        return res.redirect('/user/login');
    }
    next();
}
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.url = req.session.redirectUrl;
    }
    next()
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let data = await listing.findById(id);  
    if(!data.owner.equals(req.user._id)){
        req.flash('error','you dont have permission to edit');
        res.redirect(`/listing`);
    }
    next();
} 

module.exports.isreviewOwner = async(req,res,next)=>{
    const { reviewId } = req.params;
    let review = await Review.findById(reviewId);  
    if(!review.author.equals(res.locals.curuser._id)){
        req.flash('error','youare not the author of this review');
        return res.redirect(`/listing`);
    }
    next();
} 

module.exports.validateList = (req,res,next)=>{
    console.log(req.body);
    let {error} = listingschema.validate(req.body);
    if(error){
        let errormsg = error.details.map((el)=>el.message).join(',');
        throw new ExpressError(400,errormsg);
    }else{
        next();
    }
}

module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errormsg = error.details.map((el)=>el.message).join(',');
        throw new ExpressError(400,errormsg);
    }else{
        next();
    }

}