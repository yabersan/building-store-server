const { Router } = require("express");

const router = Router();

router.use("/users", require("./users.route"));
router.use("/products", require("./products.route"));
router.use("/reviews", require("./reviews.route"));
router.use("/chats", require("./chats.route"));


module.exports = router;
