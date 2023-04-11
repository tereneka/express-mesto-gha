const express = require("express");
const mongoose = require("mongoose");
const { router } = require("./routes/router");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use((req, res, next) => {
  req.user = {
    _id: "643538a11ebdb8ccd173a354",
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
