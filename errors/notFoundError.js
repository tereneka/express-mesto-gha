class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.message = message || "Данные не найдены.";
  }
}

module.exports = NotFoundError;
