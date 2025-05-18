const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("MONGODB_URI is not defined in .env file");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/", notificationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
