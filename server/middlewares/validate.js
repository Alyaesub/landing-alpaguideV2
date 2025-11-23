const validator = require("validator");

exports.validateBeta = (req, res, next) => {
	const { firstname, lastname, email, profileType } = req.body;

	if (!firstname || !lastname || !email) {
		return res.status(400).json({ ok: false, error: "Champs manquants." });
	}

	if (!validator.isEmail(email)) {
		return res.status(400).json({ ok: false, error: "Email invalide." });
	}

	if (firstname.length > 50 || lastname.length > 50) {
		return res.status(400).json({ ok: false, error: "Nom trop long." });
	}

	if (profileType && profileType.length > 50) {
		return res.status(400).json({ ok: false, error: "Type invalide." });
	}

	if (req.body.website) {
		return res.status(400).json({ ok: false, error: "Bot détecté." });
	}

	next();
};

exports.validateCta = (req, res, next) => {
	const { email } = req.body;

	if (!email || !validator.isEmail(email)) {
		return res.status(400).json({ ok: false, error: "Email invalide." });
	}

	next();
};
