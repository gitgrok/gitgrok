<script lang="ts">
import {ReposApi} from "../../../../../libs/generated-api/src/lib";
let detailPromise;
const reposApi = new ReposApi({basePath: 'http://localhost:7777', isJsonMime: () => true});
const reposPromise = reposApi.repositoryControllerList();
function detail (url: string) {
	detailPromise = reposApi.repositoryControllerDetails(url);
}
</script>

<main class="hero">
{#await reposPromise}
  loading
{:then repos}
  {#each repos.data as r}
   <button on:click={() => detail(r)}> {r} </button>
  {/each}
{/await}

{#if detailPromise}
	{#await detailPromise}
	{:then detail}
		{detail.data.branches}
		{detail.data.filesAndFolders}
	{/await}
{/if}


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
