const { OK, NOT_FOUND_ERROR, errMessages } = require('./errStatus');

function sendData(res, data) {
  data
    ? res.status(OK).send(data)
    : res.status(NOT_FOUND_ERROR).send({ message: errMessages.NOT_FOUND });
}

module.exports = { sendData };
