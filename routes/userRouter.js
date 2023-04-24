const userRouter = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  editProfile,
  editAvatar,
  getCurrentUser,
} = require('../controllers/user');
const {
  userIdValidator,
  userProfileValidator,
  userAvatarValidator,
} = require('../validators/userValidator');

userRouter.get('/', getUsers);

userRouter.get('/:id', userIdValidator, getUser);

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', userProfileValidator, editProfile);

userRouter.patch('/me/avatar', userAvatarValidator, editAvatar);

module.exports = userRouter;
