import { validateEmail } from "../utils/validation.js";
import { postJSON } from "../utils/http.js";

export function setupForms() {
	const betaForm = document.getElementById("beta-form");
	const ctaForm = document.getElementById("cta-form");

	if (betaForm) attachHandler(betaForm, "beta");
	if (ctaForm) attachHandler(ctaForm, "cta");
}

async function attachHandler(form, type) {
	const feedback = form.querySelector(".form__feedback");
	const button = form.querySelector("button[type='submit']");

	const show = (msg, success = false) => {
		feedback.textContent = msg;
		feedback.style.color = success ? "#8de4af" : "#fca5a5";
	};

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		// ---- HONEYPOT (anti-bot) ----
		if (form.website && form.website.value.trim() !== "") {
			console.warn("Bot détecté → requête ignorée");
			return;
		}

		const data = Object.fromEntries(new FormData(form));
		const email = data.email || data["cta-email"];

		if (!validateEmail(email)) {
			show("Adresse e-mail invalide.");
			return;
		}

		button.disabled = true;
		const oldText = button.textContent;
		button.textContent = "Envoi...";

		// ---- Sélection de l’URL selon environnement ----
		const API_BASE =
			window.location.hostname === "localhost"
				? "http://localhost:4000"
				: "https://api.alpaguide.fr";

		let url = "";
		let payload = {};

		if (type === "beta") {
			url = `${API_BASE}/api/contact/beta`;
			payload = {
				firstname: data.firstname,
				lastname: data.lastname,
				email,
				profileType: data["profile-type"],
				message: data.message || "",
			};
		} else {
			url = `${API_BASE}/api/contact/cta`;
			payload = { email };
		}

		// ---- Appel API ----
		let res = { ok: false };
		try {
			res = await postJSON(url, payload);
		} catch (err) {
			console.error("Erreur POST :", err);
		}

		if (res.ok) {
			show("Merci ! Vous recevrez un email de confirmation.", true);
			form.reset();
		} else {
			show("Erreur serveur. Réessayez plus tard.");
		}

		button.disabled = false;
		button.textContent = oldText;
	});
}
