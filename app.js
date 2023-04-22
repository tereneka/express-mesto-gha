require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { router } = require('./routes/router');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, _, next) => {
  req.user = {
    _id: '643538a11ebdb8ccd173a354',
  };

  next();
});

app.use(cookieParser()); // подключаем парсер кук как мидлвэр

// Если фронтенд и бэкенд работают на разных доменах, то в fetch нужно включить опцию credentials:
// fetch('/', {
//   method: 'GET',
//   credentials: 'include', // теперь куки посылаются вместе с запросом
// });

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
