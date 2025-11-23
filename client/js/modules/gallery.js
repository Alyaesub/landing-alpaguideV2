import { qsa } from "../utils/dom.js";

export function setupScrollReveal() {
	const items = qsa(".gallery__item");
	if (!items.length) return;

	const prefersReduced = window.matchMedia(
		"(prefers-reduced-motion: reduce)"
	).matches;
	if (prefersReduced || !("IntersectionObserver" in window)) {
		items.forEach((i) => i.classList.add("is-visible"));
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
