<script lang="ts">
import { onMount } from "svelte";
import {ReposApi} from "../../../../../libs/generated-api/src/lib";

let reposPromise;

reposPromise = new ReposApi({basePath: 'http://localhost:3333', isJsonMime: () => true}).repositoryControllerList();
onMount(() => {
  reposPromise = new ReposApi({basePath: 'http://localhost:3333', isJsonMime: () => true}).repositoryControllerList();
});
</script>

<main class="hero">
	<h1>@GITGROK</h1>

{#await reposPromise}
  loading
{:then repos}
  {#each repos.data as r}
    {r}
  {/each}
{/await}

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>
