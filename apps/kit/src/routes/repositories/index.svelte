<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";

let repos = [
	'one', 'two', 'three'
];

const api = async (url, { fetch }) => {
	const res = await fetch(`http://localhost:7777/${url}.json`);

	if (!res.ok) {
		const { message } = await res.json();
		console.warn(url, message);
	}

	return await res.json();
};

export const load: Load = async ({ fetch }) => {
	return { props: {repos: await api('repositories', {fetch}) }};
};

</script>

{#each repos as k}
{k}
{/each}