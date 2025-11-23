const nodemailer = require("nodemailer");

//  Transporteur SMTP O2Switch
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST, // mail.alpaguide.fr
	port: Number(process.env.EMAIL_PORT), // 465
	secure: process.env.EMAIL_SECURE === "true", // SSL/TLS
	auth: {
		user: process.env.EMAIL_USER, // noreply@alpaguide.fr
		pass: process.env.EMAIL_PASS, // mot de passe O2Switch
	},
	tls: {
		rejectUnauthorized: false,
	},
});

// Vérifier la connexion SMTP
transporter.verify((error, success) => {
	if (error) {
		console.error("❌ Erreur SMTP :", error);
	} else {
		console.log("✅ SMTP O2Switch opérationnel");
	}
});

// 📬 Fonction générique d'envoi d'email
exports.sendContactMail = async ({ subject, name, email, type, message }) => {
	return transporter.sendMail({
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
};

// 📬 Envoi d'un mail au visiteur (accusé de réception)
exports.sendUserConfirmationMail = async ({ email, firstname }) => {
	return transporter.sendMail({
		from: `"Alpaguide" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: "Merci pour votre inscription à la bêta Alpaguide !",
		text: `
Bonjour ${firstname || ""},

Merci pour votre inscription à la bêta privée d’Alpaguide 

Nous sommes en train de construire une plateforme simple, locale et humaine pour connecter passionnés et professionnels de la montagne.

👉 Vous serez informé dès l'ouverture de l'accès anticipé.
👉 Vous recevrez les nouveautés directement par email.

À très vite !
L’équipe Alpaguide
    `,
	});
};

// 📬 Envoi d'un mail au visiteur - CTA Early Access
exports.sendUserCtaConfirmation = async ({ email }) => {
	return transporter.sendMail({
		from: `"Alpaguide" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: "Merci pour votre demande d’accès anticipé Alpaguide !",
		text: `
Bonjour,

Merci pour votre demande d'accès anticipé à Alpaguide 

Nous vous tiendrons informé(e) dès l’ouverture de la bêta privée et des prochaines étapes.

À très vite,
L’équipe Alpaguide
    `,
	});
};
