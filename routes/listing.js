const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


// router.route --> optimized way 
// req going on "/", group them together
router
  .route("/")
  .get(wrapAsync (ListingController.index))            //index route
  .post(
    isLoggedIn,
    
    upload.single("listing[image]"),
    validateListing,
    wrapAsync (ListingController.createListing)     // create route
  );
  

//New Route
router.get("/new", isLoggedIn, ListingController.renderNewForm);
  

router
    .route("/:id")
    .get(wrapAsync (ListingController.showListing))       //show route
    .put(
      isLoggedIn, 
      isOwner, 
      upload.single("listing[image]"),
      validateListing, 
      wrapAsync (ListingController.updateListing)         // update route
    )
    .delete(
      isLoggedIn, 
      isOwner, 
      wrapAsync (ListingController.destroyListing)        // delete route
    );


//Edit Route
  router.get(
    "/:id/edit", 
    isLoggedIn, 
    isOwner, 
    wrapAsync (ListingController.renderEditForm)
  );
  

  module.exports = router;