const { NOT_FOUND_ERROR } = require("../utils/errStatus");

const router = require("express").Router();

router.use("/users", require("./userRouter"));
router.use("/cards", require("./cardRouter"));

router.use((_, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Неверный URL." });
});

module.exports = { router };
