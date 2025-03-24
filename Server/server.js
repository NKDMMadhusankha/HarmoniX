const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/authRoutes"); // Changed import path

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("your_mongo_db_connection_string") // Removed deprecated options
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err)); // Simplified error logging

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
