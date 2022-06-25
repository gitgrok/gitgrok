<script lang="ts">
import {ReposApi} from "../../../../../libs/generated-api/src/lib";
let detailPromise;
const reposApi = new ReposApi({basePath: 'http://localhost:7777', isJsonMime: () => true});
const reposPromise = reposApi.repositoryControllerList();
function detail (url: string) {
	detailPromise = reposApi.repositoryControllerDetails(url);
	// detailPromise = reposApi.re
}
</script>

<h2>REPOS</h2>
<div class="row">
	<div>
		<h3>URL</h3>
		{#await reposPromise}
			loading
		{:then repos}
			{#each repos.data as r}
				<button class=btn on:click={() => detail(r)}> {r} </button>
			{/each}
		{/await}
	</div>

	{#if detailPromise}
		{#await detailPromise}
		{:then detail}
			<div>
				<h3>BRANCHES</h3>
				<div>{detail.data.branches}</div>
			</div>
			<div class=col>
				<h3>DIRECTORY LISTING</h3>
				{#each detail.data.filesAndFolders.split('\n') as entry}
					<div>{entry}</div>
				{/each}
			</div>
		{/await}
	{/if}
</div>

<style lang="scss">
	@import "@onivoro/browser-layout/button";
	@import "@onivoro/browser-layout/flex";
	@import "@onivoro/browser-layout/hero";
	@import "@onivoro/browser-layout/text";

	.row {
		width: 100%;
		@extend .txt;
		& > div {
			@extend .txt;
			width: 33%;
			border: solid 1px rgba(0,0,0,0.1);
		}
	}

</style>
