const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./Routes/UserRoute");
const roomRoute = require("./Routes/RoomRoute");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRoute);
app.use("/rooms", roomRoute);

// Mongoose Connectivity
mongoose.connect(
  process.env.CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err.message);
    console.log("Database Connected!");
    app.listen(5000, () => {
      console.log("Server listening to the port 5000");
    });
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
