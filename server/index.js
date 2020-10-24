const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require('cors');

const departmentsRouter = require("./routes/departments");
const productsRouter = require("./routes/products");
const promotionsRouter = require("./routes/promotions");

// configure app
app.use(morgan("dev")); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 8080; // set our port

// DATABASE SETUP
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/store", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); // connect to our database

// Handle the connection event
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("DB connection alive");
});

// REGISTER OUR ROUTES -------------------------------
app.use("/api/departments", departmentsRouter);
app.use("/api/products", productsRouter);
app.use("/api/promotions", promotionsRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
