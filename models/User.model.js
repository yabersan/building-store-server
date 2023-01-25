const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  basket: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      volume: Number,
    },
  ],
  capital: Number
});

const User = mongoose.model("User", userSchema);
module.exports = User;
