const {
  OK,
  NOT_FOUND_ERROR,
  errMessages,
  BAD_REQUEST_ERROR,
  DEFAULT_ERROR,
} = require("./errStatus");

function sendData(res, data) {
  data
    ? res.status(OK).send(data)
    : res.status(NOT_FOUND_ERROR).send({ message: errMessages.notFound });
}

function sendError(res, err, errName) {
  err.name === errName
    ? res.status(BAD_REQUEST_ERROR).send({ message: errMessages.badRequest })
    : res.status(DEFAULT_ERROR).send({ message: errMessages.default });
}

module.exports = { sendData, sendError };
