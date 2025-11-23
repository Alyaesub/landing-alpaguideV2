export async function postJSON(url, data) {
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		return await res.json();
	} catch (err) {
		console.error("❌ HTTP Error:", err);
		return { ok: false };
	}
}
