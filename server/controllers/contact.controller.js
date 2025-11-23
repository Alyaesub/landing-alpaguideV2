const { sendContactMail } = require("../utils/sendMail");

//Formulaire BÊTA
exports.sendBetaMail = async (req, res) => {
	try {
		const { firstname, lastname, email, profileType, message } = req.body;

		// Mini validation
		if (!firstname || !lastname || !email) {
			return res.status(400).json({
				ok: false,
				error: "Champs requis manquants.",
			});
		}

		await sendContactMail({
			subject: "Nouvelle inscription BÊTA — Alpaguide",
			name: `${firstname} ${lastname}`.trim(),
			email,
			type: profileType || "Non spécifié",
			message: message || "",
		});

		return res.json({ ok: true });
	} catch (error) {
		console.error("❌ Erreur sendBetaMail :", error);
		return res
			.status(500)
			.json({ ok: false, error: "Erreur serveur lors de l’envoi." });
	}
};

//Formulaire CTA (email seul)
exports.sendCtaMail = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({
				ok: false,
				error: "Email requis.",
			});
		}

		await sendContactMail({
			subject: "Demande Early Access — Alpaguide",
			name: "Visiteur Landing",
			email,
			type: "CTA",
			message: "",
		});

		return res.json({ ok: true });
	} catch (error) {
		console.error("❌ Erreur sendCtaMail :", error);
		return res
			.status(500)
			.json({ ok: false, error: "Erreur serveur lors de l’envoi." });
	}
};
