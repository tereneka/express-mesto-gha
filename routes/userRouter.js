const userRouter = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  editProfile,
  editAvatar,
} = require("../controllers/user");

userRouter.get("/users", getUsers);

userRouter.get("/users/:userId", getUser);

userRouter.post("/users", createUser);

userRouter.patch("/users/me", editProfile);

userRouter.patch("/users/me/avatar", editAvatar);

module.exports = userRouter;
