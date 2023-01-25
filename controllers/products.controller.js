const Product = require("../models/Product.model");

module.exports.productsController = {
  addProduct: async (req, res) => {
    const productPicture =
      "http://localhost:4040/images/" + req.file.originalname;
    const { productName, productDescription, price } = req.body;
    try {
      const product = await Product.create({
        productName,
        productDescription,
        price,
        productPicture,
      });
      res.json(product);
    } catch (error) {
      res.json(error);
    }
  },
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      return res.json(products);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
