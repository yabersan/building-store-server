const { Router } = require("express");
const router = Router();
const { productsController } = require("../controllers/products.controller");
const image = require("../middlewares/file.middleware");

router.post("/", image.single("image"), productsController.addProduct);
router.get("/", productsController.getProducts);

module.exports = router;
