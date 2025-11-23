import { qs, qsa } from "../utils/dom.js";

const themeSwitcher = qs(".theme-switcher");
const themeButtons = qsa(".theme-switcher__option");
const themeClose = qs(".theme-switcher__close");
const themeRestore = qs(".theme-switcher__restore");

const themes = ["forest", "glacier", "sunset"];

export function applyTheme(theme) {
	const safeTheme = themes.includes(theme) ? theme : "forest";

	document.body.classList.remove(...themes.map((t) => `theme-${t}`));
	document.body.classList.add(`theme-${safeTheme}`);

	themeButtons.forEach((btn) =>
		btn.classList.toggle("is-active", btn.dataset.theme === safeTheme)
	);

	try {
		localStorage.setItem("alpaguide-theme", safeTheme);
	} catch (_) {}
}

export function setupThemeSwitcher() {
	if (!themeSwitcher) return;

	const storedTheme = localStorage.getItem("alpaguide-theme");
	applyTheme(storedTheme || "forest");

	themeButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			applyTheme(btn.dataset.theme);
		});
	});

	themeClose?.addEventListener("click", () => {
		themeSwitcher.classList.add("is-hidden");
		themeRestore.classList.add("is-visible");
		localStorage.setItem("alpaguide-theme-switcher-hidden", "true");
	});

	themeRestore?.addEventListener("click", () => {
		themeSwitcher.classList.remove("is-hidden");
		themeRestore.classList.remove("is-visible");
		localStorage.setItem("alpaguide-theme-switcher-hidden", "false");
	});
}
