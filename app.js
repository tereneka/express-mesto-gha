const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const cardRouter = require("./routes/cardRouter");

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use((req, res, next) => {
  req.user = {
    _id: "64335634477c451b05cf05d3",
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
