import { qs, qsa } from "../utils/dom.js";

const nav = qs(".nav");
const navToggle = qs(".nav__toggle");
const navClose = qs(".nav__close");
const navLinks = qsa(".nav a");

const focusableSelector = "a[href], button, textarea, input, select";
let navFocusable = [];

function openNav() {
	if (!nav) return;
	nav.classList.add("is-open");
	navToggle?.classList.add("is-active");
	navToggle?.setAttribute("aria-expanded", "true");
	document.body.classList.add("nav-open");

	navFocusable = qsa(focusableSelector, nav);
	navFocusable[0]?.focus();
}

function closeNav() {
	nav?.classList.remove("is-open");
	navToggle?.classList.remove("is-active");
	navToggle?.setAttribute("aria-expanded", "false");
	document.body.classList.remove("nav-open");
}

function trapFocus(e) {
	if (!nav?.classList.contains("is-open")) return;
	if (e.key !== "Tab") return;

	const focusables = navFocusable.length
		? navFocusable
		: qsa(focusableSelector, nav);

	if (!focusables.length) return;

	const first = focusables[0];
	const last = focusables[focusables.length - 1];
	const active = document.activeElement;

	if (e.shiftKey && active === first) {
		e.preventDefault();
		last.focus();
	} else if (!e.shiftKey && active === last) {
		e.preventDefault();
		first.focus();
	}
}

export function setupNavigation() {
	navToggle?.addEventListener("click", () => {
		nav.classList.contains("is-open") ? closeNav() : openNav();
	});

	navClose?.addEventListener("click", closeNav);

	navLinks.forEach((link) => {
		link.addEventListener("click", closeNav);
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeNav();
		trapFocus(e);
	});

	window.addEventListener("resize", () => {
		if (window.innerWidth >= 768) closeNav();
	});
}
