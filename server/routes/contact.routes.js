const express = require("express");
const router = express.Router();

// Import des contrôleurs et middleware
const {
	sendBetaMail,
	sendCtaMail,
} = require("../controllers/contact.controller");
//middleware
const { validateBeta, validateCta } = require("../middlewares/validate");

//Routes mailing securisé via validate dans middleware
router.post("/beta", validateBeta, sendBetaMail);
router.post("/cta", validateCta, sendCtaMail);
router.get("/test", (req, res) => {
	res.json({ message: "test ok" });
});

module.exports = router;
