const OK = 200;
const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR = 500;

const errMessages = {
  badRequest: "Переданы некорректные данные.",
  notFound: "Данные не найдены.",
  default: "Что-то пошло не так...",
};

module.exports = {
  OK,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
  errMessages,
};
