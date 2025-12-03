const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");

// Charger le .env
dotenv.config();

// Import des routes
const app = express();
const contactRoutes = require("./routes/contact.routes");
const { contactLimiter } = require("./middlewares/rateLimit");
const logger = require("./middlewares/logger");
const sanitize = require("./middlewares/sanitize");

//  Middlewares globaux
app.use(cors()); // Autoriser les requêtes du front
app.use(express.json()); // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser forms si besoin
app.use("/api/contact", contactLimiter);
app.use(helmet());
app.use(logger);
app.use(sanitize);

// Route test (ping)
app.get("/api/ping", (req, res) => {
	res.json({ message: "pong" });
});

//Routes API
app.use("/api/contact", contactRoutes);

// Pour tester le déploiement
console.log("🔁 Nouvelle version déployée !");

// Lancement serveur
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`✅ API Alpaguide en ligne sur le port ${PORT}`);
});
