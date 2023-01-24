const { Router } = require("express");

const router = Router();

router.use("/users", require("./users.route"));

module.exports = router;
