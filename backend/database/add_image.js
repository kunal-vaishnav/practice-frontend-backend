const mongoose = require("mongoose");
const Imageschema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  description: String,
  image: String,
});
module.exports = mongoose.model("Image", Imageschema);
