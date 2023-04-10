function sendResult(data, res, err) {
  if (!data) {
    throw err;
  }
  res.send(data);
}

function sendError(res, err) {
  res.status(err.statusCode).send({ message: err.message });
}

module.exports = { sendResult, sendError };
