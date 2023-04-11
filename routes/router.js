const router = require("express").Router();

router.use("/users", require("./userRouter"));
router.use("/cards", require("./cardRouter"));

module.exports = { router };
