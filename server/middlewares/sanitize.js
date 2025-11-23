const validator = require("validator");

module.exports = function sanitize(req, res, next) {
	if (req.body) {
		for (let field in req.body) {
			if (typeof req.body[field] === "string") {
				req.body[field] = validator.escape(req.body[field]);
			}
		}
	}
	next();
};
