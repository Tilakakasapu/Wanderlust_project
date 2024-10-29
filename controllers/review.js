const listing = require('../models/listing');
const Review = require('../models/reviews');  


module.exports.destroyreview = async (req, res) => {
    const { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Listing Deleted');
    res.redirect(`/listings/${id}`);
}

module.exports.newReview = async (req,res)=>{
    let listingdoc=  await  listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    console.log(newreview);
    listingdoc.reviews.push(newreview);
    await newreview.save();
    await listingdoc.save();
    req.flash('success','new Review Created');
    res.redirect(`/listings/${listingdoc._id}`);
 };