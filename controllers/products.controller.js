const Product = require("../models/Product.model");

module.exports.productsController = {
  addNews: async (req, res) => {
    const imageURL = "http://localhost:4040/images/" + req.file.originalname;
    const { productName, productDescription, price } = req.body;
    try {
      const product = await Product.create({
        productName,
        productDescription,
        price,
      });
      res.json(product);
    } catch (error) {
      res.json(error);
    }
  },
};
