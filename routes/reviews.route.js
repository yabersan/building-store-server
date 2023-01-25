const { Router } = require("express");
const { reviewControllers } = require("../controllers/reviews.controller");
const router = Router();


router.post("/", reviewControllers.addReview);
router.get("/", reviewControllers.getReviews);
router.delete("/:id", reviewControllers.deleteReview);



module.exports = router;
