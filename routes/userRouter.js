const userRouter = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  editProfile,
  editAvatar,
  getCurrentUser,
} = require('../controllers/user');

userRouter.get('/', getUsers);

userRouter.get('/:userId', getUser);

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', editProfile);

userRouter.patch('/me/avatar', editAvatar);

module.exports = userRouter;
