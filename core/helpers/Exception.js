class Exception {
  constructor(message, statusCode, codeException) {
    this.message = message;
    this.statusCode = statusCode;
    this.codeException = codeException;
  }
}

// exports.Exception = Exception;
module.exports = Exception;
