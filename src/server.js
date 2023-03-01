const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const authController = require("./routes/auth");
const courseController = require("./routes/course");

const app = express();
app.use(express.json());


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client")));

app.use(authController);
app.use(courseController);

app.listen(PORT, () => console.log("Server is running http://localhost:" + PORT));