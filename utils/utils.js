const { OK, errMessages } = require('./errStatus');
const NotFoundError = require('../errors/notFoundErr');

function sendData(res, data) {
  if (!data) {
    throw new NotFoundError(errMessages.NOT_FOUND);
  }
  res.status(OK).send(data);
}

module.exports = { sendData };
