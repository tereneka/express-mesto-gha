const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const { NOT_FOUND_ERROR } = require('../utils/errStatus');
const {
  loginValidator,
  registerValidator,
} = require('../validators/userValidator');
const router = require('express').Router();

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, createUser);

router.use(auth);

router.use('/users', require('./userRouter'));
router.use('/cards', require('./cardRouter'));

router.use((_, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Неверный URL.' });
});

module.exports = { router };
