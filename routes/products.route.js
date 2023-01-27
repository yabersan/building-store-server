const { Router } = require("express");
const router = Router();
const { productsController } = require("../controllers/products.controller");
const image = require("../middlewares/file.middleware");

router.post("/", image.single("image"), productsController.addProduct);
router.post("/email", productsController.sendEmail);
router.get("/", productsController.getProducts);
router.post("/autocomplete", productsController.autocompleteProducts);
router.post("/feedback", productsController.sendForm);


module.exports = router;

