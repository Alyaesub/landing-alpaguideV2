const fs = require("fs");
const path = require("path");

const logDir = path.join(process.cwd(), "logs");

// Créer le dossier logs s'il n'existe pas
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, "server.log");

function log(message) {
	const timestamp = new Date().toISOString();
	const entry = `[${timestamp}] ${message}\n`;

	console.log(entry.trim());
	fs.appendFileSync(logFile, entry);
}

function logError(message, error) {
	const timestamp = new Date().toISOString();
	const entry = `[${timestamp}] ❌ ERROR: ${message} → ${
		error?.message || error
	}\n`;

	console.error(entry.trim());
	fs.appendFileSync(logFile, entry);
}

module.exports = {
	log,
	logError,
};
