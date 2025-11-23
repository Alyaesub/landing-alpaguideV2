const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav__toggle");
const navClose = document.querySelector(".nav__close");
const navLinks = document.querySelectorAll(".nav a");
const yearEl = document.getElementById("year");
const themeSwitcher = document.querySelector(".theme-switcher");
const themeButtons = document.querySelectorAll(".theme-switcher__option");
const themeClose = document.querySelector(".theme-switcher__close");
const themeRestore = document.querySelector(".theme-switcher__restore");
const themes = ["forest", "glacier", "sunset"];

const focusableSelector = "a[href], button, textarea, input, select";
let navFocusable = [];

function setYear() {
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}
}

function closeNav() {
	nav?.classList.remove("is-open");
	navToggle?.classList.remove("is-active");
	navToggle?.setAttribute("aria-expanded", "false");
	document.body.classList.remove("nav-open");
}

function openNav() {
	nav?.classList.add("is-open");
	navToggle?.classList.add("is-active");
	navToggle?.setAttribute("aria-expanded", "true");
	document.body.classList.add("nav-open");
	navFocusable = Array.from(nav?.querySelectorAll(focusableSelector) || []);
	navFocusable[0]?.focus();
}

function handleNavToggle() {
	const isOpen = nav?.classList.contains("is-open");
	if (isOpen) {
		closeNav();
	} else {
		openNav();
	}
}

function trapFocus(event) {
	if (!nav?.classList.contains("is-open")) return;
	if (event.key !== "Tab") return;
	const focusables = navFocusable.length
		? navFocusable
		: Array.from(nav.querySelectorAll(focusableSelector));
	if (!focusables.length) return;
	const first = focusables[0];
	const last = focusables[focusables.length - 1];
	const active = document.activeElement;
	if (event.shiftKey && active === first) {
		event.preventDefault();
		last.focus();
	} else if (!event.shiftKey && active === last) {
		event.preventDefault();
		first.focus();
	}
}

function setupNavigation() {
	navToggle?.addEventListener("click", handleNavToggle);
	navClose?.addEventListener("click", closeNav);
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			closeNav();
		});
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeNav();
		}
		trapFocus(event);
	});
	window.addEventListener("resize", () => {
		if (window.innerWidth >= 768) {
			closeNav();
		}
	});
}

function smoothScroll() {
	const links = document.querySelectorAll('a[href^="#"]');
	links.forEach((link) => {
		link.addEventListener("click", (event) => {
			const targetId = link.getAttribute("href");
			if (!targetId || targetId === "#") return;
			const targetEl = document.querySelector(targetId);
			if (targetEl) {
				event.preventDefault();
				targetEl.scrollIntoView({ behavior: "smooth" });
			}
		});
	});
}

function validateEmail(value) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(String(value).toLowerCase());
}

function handleForm(form) {
	if (!form) return;
	const feedback = form.querySelector(".form__feedback");

	const setFeedback = (message, isSuccess = false) => {
		if (!feedback) return;
		feedback.textContent = message;
		feedback.style.color = isSuccess ? "#8de4af" : "#fca5a5";
	};

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(form);
		const email = (formData.get("email") || formData.get("cta-email") || "")
			.toString()
			.trim();
		const firstname = (formData.get("firstname") || "").toString().trim();
		const lastname = (formData.get("lastname") || "").toString().trim();
		const profile = (formData.get("profile-type") || "").toString().trim();

		if (form.id === "beta-form" && (!firstname || !lastname || !profile)) {
			setFeedback("Merci de remplir les champs requis.");
			return;
		}

		if (!validateEmail(email)) {
			setFeedback("Adresse e-mail invalide.");
			return;
		}

		setFeedback("Merci ! Nous revenons vers vous rapidement.", true);
		form.reset();
	});
}

function setupFaq() {
	const items = document.querySelectorAll(".faq__item");
	items.forEach((item) => {
		const question = item.querySelector(".faq__question");
		const answer = item.querySelector(".faq__answer");
		question?.addEventListener("click", () => {
			const isOpen = item.classList.contains("is-open");
			items.forEach((other) => {
				other.classList.remove("is-open");
				const btn = other.querySelector(".faq__question");
				const panel = other.querySelector(".faq__answer");
				btn?.setAttribute("aria-expanded", "false");
				if (panel) panel.style.maxHeight = "0px";
			});
			if (!isOpen) {
				item.classList.add("is-open");
				question.setAttribute("aria-expanded", "true");
				if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
			}
		});
	});
}

function setupScrollReveal() {
	const items = document.querySelectorAll(".gallery__item");
	if (!items.length) return;

	const prefersReduced = window.matchMedia(
		"(prefers-reduced-motion: reduce)"
	).matches;
	if (prefersReduced || !("IntersectionObserver" in window)) {
		items.forEach((item) => item.classList.add("is-visible"));
		return;
	}

	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					obs.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.6 }
	);

	items.forEach((item) => observer.observe(item));
}

function applyTheme(theme) {
	const safeTheme = themes.includes(theme) ? theme : "forest";
	document.body.classList.remove(...themes.map((t) => `theme-${t}`));
	document.body.classList.add(`theme-${safeTheme}`);
	themeButtons.forEach((btn) =>
		btn.classList.toggle("is-active", btn.dataset.theme === safeTheme)
	);
	try {
		localStorage.setItem("alpaguide-theme", safeTheme);
	} catch (error) {
		// ignore storage errors (private mode)
	}
}

function setupThemeSwitcher() {
	if (!themeSwitcher) return;
	const storedTheme = (() => {
		try {
			return localStorage.getItem("alpaguide-theme");
		} catch (error) {
			return null;
		}
	})();
	const storedHidden = (() => {
		try {
			return (
				localStorage.getItem("alpaguide-theme-switcher-hidden") ===
				"true"
			);
		} catch (error) {
			return false;
		}
	})();

	const setRestoreVisibility = (visible) => {
		if (!themeRestore) return;
		themeRestore.classList.toggle("is-visible", visible);
	};

	if (storedHidden) {
		themeSwitcher.classList.add("is-hidden");
		setRestoreVisibility(true);
	} else {
		applyTheme(storedTheme || "forest");
		if (themeButtons.length) {
			themeButtons.forEach((btn) => {
				btn.addEventListener("click", () => {
					applyTheme(btn.dataset.theme);
				});
			});
		}
		setRestoreVisibility(false);
	}

	themeClose?.addEventListener("click", () => {
		themeSwitcher.classList.add("is-hidden");
		setRestoreVisibility(true);
		try {
			localStorage.setItem("alpaguide-theme-switcher-hidden", "true");
		} catch (error) {
			// ignore storage errors
		}
	});

	themeRestore?.addEventListener("click", () => {
		themeSwitcher.classList.remove("is-hidden");
		setRestoreVisibility(false);
		try {
			localStorage.setItem("alpaguide-theme-switcher-hidden", "false");
		} catch (error) {
			// ignore storage errors
		}
	});
}

function init() {
	setYear();
	setupNavigation();
	smoothScroll();
	handleForm(document.getElementById("beta-form"));
	handleForm(document.getElementById("cta-form"));
	setupFaq();
	setupScrollReveal();
	setupThemeSwitcher();
}

document.addEventListener("DOMContentLoaded", init);
