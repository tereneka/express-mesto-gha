class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
    this.message = message || "Вы указали некорректные данные.";
  }
}

module.exports = BadRequestError;
