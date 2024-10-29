const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedin,isOwner,isreviewOwner,validateReview } = require('../middleware.js');
const review_cont  = require('../controllers/review.js');

router.post('/',isLoggedin,validateReview,wrapAsync(review_cont.newReview));

router.delete('/:reviewId',isLoggedin,isreviewOwner,wrapAsync(review_cont.destroyreview));

module.exports = router;