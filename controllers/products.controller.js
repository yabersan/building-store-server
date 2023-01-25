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
};
