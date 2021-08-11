class Exception {
  constructor(message, statusCode, codeException) {
    this.message = message;
    this.statusCode = statusCode;
    this.codeException = codeException;
  }
}


module.exports = Exception;
