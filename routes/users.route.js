const { Router } = require("express");
const router = Router();
const { userController } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/signup", userController.signUp);
router.post("/login", userController.signIn);
router.post("/getcart", authMiddleware, userController.getInCart);
router.post("/addcart", authMiddleware, userController.addInCart);
router.patch("/capital", authMiddleware, userController.toUpYourAccount);
router.patch(
  "/removeproductincart",
  authMiddleware,
  userController.removeProductInCart
);

module.exports = router;
