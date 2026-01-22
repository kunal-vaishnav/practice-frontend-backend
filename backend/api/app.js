const {
  add_data,
  add_meals,
  add_photos,
} = require("./foods/controller/add_data");
//const getdata = require("./foods/controller/get_data");
const router = require("express").Router();
router.post("/orders", add_data);
router.get("/meals", add_meals);
router.get("/images/:filename", add_photos);
//router.get("/getdata", getdata);
module.exports = router;
