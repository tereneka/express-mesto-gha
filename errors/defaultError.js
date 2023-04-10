class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.name = "DefaultError";
    this.statusCode = 500;
    this.message = message || "Что-то пошло не так...";
  }
}

module.exports = DefaultError;
