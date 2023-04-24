require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { router } = require('./routes/router');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const customErr = require('./middlewares/customError');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cookieParser()); // подключаем парсер кук как мидлвэр

// Если фронтенд и бэкенд работают на разных доменах, то в fetch нужно включить опцию credentials:
// fetch('/', {
//   method: 'GET',
//   credentials: 'include', // теперь куки посылаются вместе с запросом
// });

app.use(router);

app.use(errors());

app.use(customErr);

app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
