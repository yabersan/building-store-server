const { Router } = require("express");
const { reviewControllers } = require("../controllers/reviews.controller");
const router = Router();


router.post("/reviews", reviewControllers.addReview);
router.get("/reviews", reviewControllers.getReviews);
router.delete("/reviews/:id", reviewControllers.deleteReview);



module.exports = router;
