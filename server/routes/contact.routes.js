const express = require("express");
const router = express.Router();

// Import des contrôleurs
const {
	sendBetaMail,
	sendCtaMail,
} = require("../controllers/contact.controller");

//Routes mailing

// Formulaire Bêta (Prénom/Nom/Email/Type)
router.post("/beta", sendBetaMail);

// Formulaire CTA (Email simple)
router.post("/cta", sendCtaMail);

module.exports = router;
