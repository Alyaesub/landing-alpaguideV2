import { setupNavigation } from "./modules/navigation.js";
import { setupThemeSwitcher } from "./modules/theme.js";
import { setupFaq } from "./modules/faq.js";
import { setupScrollReveal } from "./modules/gallery.js";
import { setupForms } from "./modules/forms.js";

document.addEventListener("DOMContentLoaded", () => {
	setupNavigation();
	setupThemeSwitcher();
	setupFaq();
	setupScrollReveal();
	setupForms();
});
