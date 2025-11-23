const rateLimit = require("express-rate-limit");

exports.contactLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 5, // 5 requêtes max
	message: { ok: false, error: "Trop de tentatives, attendez une minute." },
});
