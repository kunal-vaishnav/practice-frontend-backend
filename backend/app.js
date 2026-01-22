// const fs = require("fs/promises");

// const bodyParser = require("body-parser");
// const express = require("express");
// const path = require("path");
// const app = express();

// app.use(bodyParser.json());
// app.use(express.static("public"));
// //console.log(path.join(__dirname, "public"));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.get("/meals", async (req, res) => {
//   const meals = await fs.readFile(
//     "D:\\Foodorder App\\backend\\data\\available-meals.json",
//     "utf8"
//   );
//   res.json(JSON.parse(meals));
// });

// app.post("/orders", async (req, res) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const orderData = req.body.order;

//   if (
//     orderData === null ||
//     orderData.items === null ||
//     orderData.items.length === 0
//   ) {
//     return res.status(400).json({ message: "Missing data." });
//   }

//   if (
//     orderData.customer.email === null ||
//     !orderData.customer.email.includes("@") ||
//     orderData.customer.name === null ||
//     orderData.customer.name.trim() === "" ||
//     orderData.customer.street === null ||
//     orderData.customer.street.trim() === "" ||
//     orderData.customer["postal-code"] === null ||
//     orderData.customer["postal-code"].trim() === "" ||
//     orderData.customer.city === null ||
//     orderData.customer.city.trim() === ""
//   ) {
//     return res.status(400).json({
//       message:
//         "Missing data: Email, name, street, postal code or city is missing.",
//     });
//   }

//   const newOrder = {
//     ...orderData,
//     id: (Math.random() * 1000).toString(),
//   };
//   const orders = await fs.readFile(
//     "D:\\Foodorder App\\backend\\data\\orders.json",
//     "utf8"
//   );
//   const allOrders = JSON.parse(orders);
//   allOrders.push(newOrder);
//   await fs.writeFile(
//     "D:\\Foodorder App\\backend\\data\\orders.json",
//     JSON.stringify(allOrders)
//   );
//   res.status(201).json({ message: "Order created!" });
// });

// app.use((req, res) => {
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   res.status(404).json({ message: "Not found" });
// });

// app.listen(3000);
//second approach
// const fs = require("fs/promises");
// const bodyParser = require("body-parser");
// const express = require("express");
// const path = require("path");

// const app = express();
// const DATA_PATH = path.join(__dirname, "data");

// // Middleware
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public"))); // Serve static files dynamically

// // CORS Headers
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// //Get meals dynamically
// app.get("/meals", async (req, res) => {
//   try {
//     const mealsPath = path.join(DATA_PATH, "available-meals.json");
//     const meals = await fs.readFile(mealsPath, "utf8");
//     res.json(JSON.parse(meals));
//   } catch (error) {

//     res.status(500).json({ message: "Error fetching meals", error });
//   }
// });

// //  Handle order creation dynamically
// app.post("/orders", async (req, res) => {
//   try {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     const orderData = req.body.order;

//     if (!orderData || !orderData.items || orderData.items.length === 0) {
//       return res.status(400).json({ message: "Missing order data." });
//     }
//     const customer = orderData.customer;
//     if (
//       !customer.email ||
//       !customer.email.includes("@") ||
//       !customer.name ||
//       customer.name.trim() === "" ||
//       !customer.street ||
//       customer.street.trim() === "" ||
//       !customer["postal-code"] ||
//       customer["postal-code"].trim() === "" ||
//       !customer.city ||
//       customer.city.trim() === ""
//     ) {
//       return res.status(400).json({
//         message: "Missing required customer details.",
//       });
//     }

//     // Create new order object
//     const newOrder = {
//       ...orderData,
//       id: Date.now().toString(),
//     };

//     // Read existing orders
//     const ordersPath = path.join(DATA_PATH, "orders.json");
//     let allOrders = [];

//     try {
//       const orders = await fs.readFile(ordersPath, "utf8");
//       allOrders = JSON.parse(orders);
//     } catch (err) {
//       console.log("No existing orders, creating new file...");
//     }

//     // Append new order
//     allOrders.push(newOrder);
//     await fs.writeFile(ordersPath, JSON.stringify(allOrders, null, 2));

//     res.status(201).json({ message: "Order created successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error processing order", error });
//   }
// });

// //  Handle OPTIONS request & 404 errors
// app.use((req, res) => {
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   res.status(404).json({ message: "Not found" });
// });

// //  Start Server
// app.listen(3000, () => console.log("Server running on port 3000 🚀"));
//third approach with backend with moongoose
const express = require("express");
const fs = require("fs/promises");
const app = express();
const path = require("path");
const cors = require("cors");
const datasschema = require("./api/app.js");
const Image = require("./database/add_image");
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", datasschema);
mongoose
  .connect(
    "mongodb+srv://test-22:hi7a18SgmgfxFaYb@kunalapi.yyh6dto.mongodb.net/"
  )
  .then(() => {
    console.log("database succesfully generated");
    seeddatabase();
  })
  .catch((err) => {
    console.log(err);
  });

const seeddatabase = async () => {
  try {
    const mealspath = path.join(__dirname, "./data/available-meals.json");

    const data = await fs.readFile(mealspath, "utf-8");
    const meals = JSON.parse(data);
    await Image.deleteMany();
    await Image.insertMany(meals);
    console.log("data seeded succesfully");
  } catch (error) {
    console.log("Got an errrr while seeding the error is", error);
  }
};

app.listen(3000, () => {
  console.log("server has started");
});
