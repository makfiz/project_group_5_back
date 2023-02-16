class HttpError extends Error {
	constructor(code, message) {
		super(message);
		Error.captureStackTrace(this, this.constructor)
		this.name = this.constructor.name
		this.status = code
	}
statusCode() {
		return this.status
	}
}

module.exports = {
	HttpError,
};