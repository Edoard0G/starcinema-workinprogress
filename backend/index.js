const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
var connection = require("./connection");
// const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const userRoute = require("./routes/User");
const filmRoute = require("./routes/Film");
const commentsRoute = require("./routes/Comments");
const reservationRoute = require("./routes/Reservation");
const showRoute = require("./routes/Show");

app.use("/user", userRoute);
app.use("/reservation", reservationRoute);
app.use("/film", filmRoute);
app.use("/comments", commentsRoute);
app.use("/show", showRoute);

app.use("/public", express.static(__dirname + "/public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server running....");
});
