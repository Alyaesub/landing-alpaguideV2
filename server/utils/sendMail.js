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
