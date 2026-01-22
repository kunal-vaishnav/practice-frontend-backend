const Order = require("../../../database/add_schema.js");
const Image = require("../../../database/add_image.js");
const addorderservice = async (orderdata) => {
  try {
    const orders = new Order(orderdata);
    await orders.save();
    return { message: "succesfully added data", order: orders };
  } catch (error) {
    return { message: error.message };
  }
};
const addmealsservice = async () => {
  return await Image.find();
};
const addphotoservice = async (filename) => {
  //const filepath=require("../../../uploads")
  return (path.join = (__dirname, "../../../uploads", filename));
};
module.exports = { addorderservice, addmealsservice, addphotoservice };
