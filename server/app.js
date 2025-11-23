const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Charger le .env
dotenv.config();

// Import des routes
const contactRoutes = require("./routes/contact.routes");

const app = express();

//  Middlewares globaux
app.use(cors()); // Autoriser les requêtes du front
app.use(express.json()); // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser forms si besoin

//Routes API
app.use("/api/contact", contactRoutes);

// Lancement serveur

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`✅ API Alpaguide en ligne sur le port ${PORT}`);
});
