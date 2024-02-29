const express = require("express");
const router = express.Router({ mergeParams: true });     // parent route to use in child route -> make it true
const wrapAsync = require("../utils/wrapAsync.js");
// const Listing = require("../models/listing.js");
// const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const ReviewController = require("../controllers/reviews.js");

// Review 
// Post route
router.post("/",isLoggedIn, validateReview, wrapAsync(ReviewController.createReview));


// Delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(ReviewController.destroyReview));


module.exports = router;
