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
      console.log(products);
      return res.json(products);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      console.log(products);
      return res.json(products);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  autocompleteProducts: async (req, res) => {
    const searchProduct = req.body;
    try {
      const products = await Product.find({
        title: new RegExp(`${searchProduct}`, "i"),
      });
      if (news.length !== 0) {
        return res.json(products);
      }
      return res.json({ error: "По вашему запросу ничего не найдено..." });
    } catch (error) {
      return res.json(error);
    }
  },
};
