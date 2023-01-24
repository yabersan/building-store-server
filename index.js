const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");


const app = express();

app.use(express.json());
app.use('/images', express.static('images'))
app.use(cors());
app.use(morgan("dev"));
app.use(require("./routes"));

const { PORT, MONGO_SERVER } = process.env;
console.log(PORT);

const connectAndStartServer = async () => {
  try {
    await mongoose.connect(MONGO_SERVER);
    app.listen(PORT, () => {
      console.log(`Успешное подключение к порту ${PORT}`);
    });
  } catch (e) {
    console.log(`Ошибка при подключении к порту ${PORT}`);
  }
};
connectAndStartServer();
