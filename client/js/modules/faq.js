import { qsa } from "../utils/dom.js";

export function setupFaq() {
	const items = qsa(".faq__item");

	items.forEach((item) => {
		const question = item.querySelector(".faq__question");
		const answer = item.querySelector(".faq__answer");

		question?.addEventListener("click", () => {
			const open = item.classList.contains("is-open");

			items.forEach((other) => {
				other.classList.remove("is-open");
				const panel = other.querySelector(".faq__answer");
				if (panel) panel.style.maxHeight = "0px";
			});

			if (!open) {
				item.classList.add("is-open");
				answer.style.maxHeight = `${answer.scrollHeight}px`;
			}
		});
	});
}
