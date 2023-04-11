const OK = 200;
const SUCCESS = 201;
const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR = 500;

const errMessages = {
  BAD_REQUEST: 'Переданы некорректные данные.',
  NOT_FOUND: 'Данные не найдены.',
  DEFAULT: 'Что-то пошло не так...',
};

module.exports = {
  OK,
  SUCCESS,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
  errMessages,
};
