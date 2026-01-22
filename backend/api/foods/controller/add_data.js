const add_data_services = require("../services/add_data_services");
const {
  addmealsservice,
  addphotoservice,
} = require("../services/add_data_services");
const add_data = async (req, res) => {
  const { order } = req.body;
  try {
    if (!order) {
      return res.status(400).json({ error: "you have entered wrong data" });
    }

    const data = await add_data_services(order);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal service error" });
  }
};
const add_meals = async (req, res) => {
  // try {
  //   const meals = await addmealsservice();
  //   res.json(meals);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
  const add_meals = async (req, res) => {
    try {
      const meals = await addmealsservice();
      console.log("Fetched meals:", meals); // ✅ Debugging log

      if (!meals || meals.length === 0) {
        return res.status(404).json({ error: "No meals found" });
      }
      console.log("Meals from DB:", meals);
      res.json(meals);
      console.log("Meals from DB:", meals);
    } catch (error) {
      console.error("Error fetching meals:", error); // ✅ Log the error
      res.status(500).json({ error: error.message });
    }
  };
};
const add_photos = async (req, res) => {
  const filename = await addphotoservice(req.params.filename);
  res.json(filename);
};
module.exports = { add_data, add_meals, add_photos };
