const nodemailer = require("nodemailer");
const { log, logError } = require("../utils/logger.js");

// Transporteur SMTP O2Switch
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: Number(process.env.EMAIL_PORT),
	secure: process.env.EMAIL_SECURE === "true",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

// Vérifier la connexion SMTP
transporter.verify((error, success) => {
	if (error) {
		logError("Erreur SMTP (verify)", error);
	} else {
		log("SMTP O2Switch opérationnel");
	}
});

// Fonction générique d'envoi d'email
exports.sendContactMail = async ({ subject, name, email, type, message }) => {
	try {
		log("Tentative d’envoi d’email…");

		await transporter.sendMail({
			from: `"Alpaguide" <${process.env.EMAIL_USER}>`,
			to: process.env.TARGET_EMAIL,
			replyTo: email,
			subject,
			text: `
Nom : ${name}
Email : ${email}
Type : ${type}

Message :
${message || "Aucun message fourni"}
      `,
		});

		log(`Email envoyé au staff (${process.env.TARGET_EMAIL})`);
	} catch (err) {
		logError("Erreur SMTP (sendContactMail)", err);
		throw err;
	}
};

// 📬 Accusé de réception (Bêta)
exports.sendUserConfirmationMail = async ({ email, firstname }) => {
	try {
		await transporter.sendMail({
			from: `"Alpaguide" <${process.env.EMAIL_USER}>`,
			to: email,
			subject: "Merci pour votre inscription à la bêta Alpaguide !",
			text: `
Bonjour ${firstname || ""},

Merci pour votre inscription à la bêta privée d’Alpaguid 🏔️

Nous vous préviendrons dès l'ouverture de l'accès anticipé.
      `,
		});

		log(`Accusé envoyé à l'utilisateur → ${email}`);
	} catch (err) {
		logError("Erreur SMTP (sendUserConfirmationMail)", err);
		throw err;
	}
};

// Accès anticipé (CTA)
exports.sendUserCtaConfirmation = async ({ email }) => {
	try {
		await transporter.sendMail({
			from: `"Alpaguide" <${process.env.EMAIL_USER}>`,
			to: email,
			subject: "Merci pour votre demande d’accès anticipé Alpaguide !",
			text: `
Bonjour,

Merci pour votre demande d'accès anticipé à Alpaguide.
Nous vous tiendrons informé(e) dès l’ouverture de la bêta.
      `,
		});

		log(`Email CTA envoyé à ${email}`);
	} catch (err) {
		logError("Erreur SMTP (sendUserCtaConfirmation)", err);
		throw err;
	}
};
