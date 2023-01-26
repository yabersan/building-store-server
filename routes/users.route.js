const { Router } = require("express");
const router = Router();
const { userController } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/signup", userController.signUp);
router.post("/login", userController.signIn);
router.patch("/cart", authMiddleware, userController.addInCart);


module.exports = router;
