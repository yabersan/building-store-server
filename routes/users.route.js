const { Router } = require("express");
const router = Router();
const { userController } = require("../controllers/users.controller");

router.post("/signup", userController.signUp);
router.post("/login", userController.signIn);

module.exports = router;
