const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  messages: [],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: "63d412c103bfb6e829d7c2d1"},
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
