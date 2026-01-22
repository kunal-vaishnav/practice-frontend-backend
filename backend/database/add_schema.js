const mongoose = require("mongoose");
const dataschema = new mongoose.Schema({
  order: {
    items: {
      type: [Object],
      required: true,
    },
    customer: {
      type: [Object],
      required: true,
    },
  },
  date_creation: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Data", dataschema);
