function tryCatchWrapper(Fn) {
	return async (req, res, next) => {
		try {
			await Fn(req, res, next);
		} catch (error) {
			return next(error);
		}
	};
}

module.exports = {
	tryCatchWrapper,
};
