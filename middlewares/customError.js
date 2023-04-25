const mongoose = require('mongoose');

const { Error } = mongoose;
const BadRequestErr = require('../errors/badRequestErr');
const ConflictErr = require('../errors/conflictErr');
const { errMessages } = require('../utils/errStatus');

module.exports = (err, req, res, next) => {
  if (err instanceof Error.CastError || err instanceof Error.ValidationError) {
    next(new BadRequestErr(errMessages.BAD_REQUEST));
  } else if (err.code === 11000) {
    next(new ConflictErr(errMessages.CONFLICT));
  } else {
    next(err);
  }
};
