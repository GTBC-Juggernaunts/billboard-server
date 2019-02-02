const express = require("express");
const PORT = process.env.PORT || 4000;
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");

//establish middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//routes
app.use(routes);

//connect to mongodb
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/billboarddb";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});