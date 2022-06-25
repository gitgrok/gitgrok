<script lang="ts">
import {ReposApi} from "../../../../../libs/generated-api/src/lib";

const reposPromise = new ReposApi({basePath: 'http://localhost:7777', isJsonMime: () => true}).repositoryControllerList();

</script>

<main class="hero">
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
