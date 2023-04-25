const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/user');
const auth = require('../middlewares/auth');
const {
  loginValidator,
  registerValidator,
} = require('../validators/userValidator');
const NotFoundErr = require('../errors/notFoundErr');

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, createUser);

router.use(auth);

router.use('/users', require('./userRouter'));
router.use('/cards', require('./cardRouter'));

router.post('/signout', logout);

router.use(() => {
  throw new NotFoundErr('Неверный URL');
});

module.exports = { router };
