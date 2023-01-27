const Product = require("../models/Product.model");
const nodemailer = require("nodemailer");

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
  sendEmail: async (req, res) => {
    const { name, lastname, number, email, product, volume, sum } = req.body;
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: "tagvu86@gmail.com",
        to: "tagvu86@gmail.com",
        subject: "Заказ.",
        text: `
          Имя заказчика: ${name},
          Фамилия заказчика: ${lastname},
          Номер телефона заказчика: ${number},
          Email заказчика: ${email},
          Материал: ${product},
          Объем: ${volume} тонн,
          Сумма заказа: ${sum}
          
        `,
      };

      const mailClientOptions = {
        from: "tagvu86@gmail.com",
        to: email,
        subject: "Заказ.",
        text: `
          Ваш заказ "${product}" объемом ${volume} тонн на сумму ${sum} принят к рассмотрению.
          
        `,
      };

      await transporter.sendMail(mailOptions);
      await transporter.sendMail(mailClientOptions);

      return res.json("Форма отправлена.");
    } catch (error) {
      return res.json(error);
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
    const {searchProduct} = req.body;

    try {
      if(searchProduct !== ""){
        const products = await Product.find({
          productName: new RegExp(`${searchProduct}`, "i"),
        });
        if (products.length !== 0) {
          return res.json(products);
      }
      }
      return res.json({ error: "По вашему запросу ничего не найдено..." });
    } catch (error) {
      return res.json(error);
    }
  },
  sendForm: async (req, res) => {
    const { name, number, email, text } = req.body;
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: "gmail",
        auth: {
          user: "tagvu86@gmail.com",
          pass: "iqboixmopesruuie",
        },
      });

      const mailOptions = {
        from: "tagvu86@gmail.com",
        to: "tagvu86@gmail.com",
        subject: "Связь клиента.",
        text: `
          Имя: ${name},
          Номер: ${number},
          Email: ${email},
          Сообщение:
          ${text}
          
        `,
      };

      const mailClientOptions = {
        from: "tagvu86@gmail.com",
        to: email,
        subject: "Спасибо за связь.",
        text: `
          Ваше сообщение отправлено админу, скоро он свяжется с вами.
          
        `,
      };

      await transporter.sendMail(mailOptions);
      await transporter.sendMail(mailClientOptions);

      return res.json("Форма отправлена.");
    } catch (error) {
      return res.json(error);
    }
  }
};
