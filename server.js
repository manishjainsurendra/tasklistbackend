require("dotenv").config();
const config = require("config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");
const path = require("path");

// constants
const PORT = process.env.PORT || 3000;
const MONGO_CONNECTION = config.get("db.connection-string");

const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: true }));

//static
app.use(express.static("public"));
// routes
app.use("/admin", adminRouter);
app.use("/users", userRouter);

// mongo connection and server
const server = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    app.listen(PORT, () => {
      console.log("server started on ", PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

server();
