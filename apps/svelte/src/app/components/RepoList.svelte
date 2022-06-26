<script lang="ts">
import {reposApi} from "../api";

let detailPromise;
let reposPromise = reposApi.repositoryControllerList();
function detail (url: string) {
	detailPromise = reposApi.repositoryControllerDetails(url);
	// detailPromise = reposApi.re
}
let showForm = false;
let urlInput;
function save () {
	reposApi.repositoryControllerTrack({url: urlInput.value}).then(() => {
		showForm = false;
		reposPromise = reposApi.repositoryControllerList();
	}).catch(e => console.warn(e));
}
</script>

<h2 class="row btn-row">REPOS <button class=btn on:click={() => showForm=true}>+</button></h2>
{#if showForm}
	<div class=btn-row>
		<input type=text bind:this={urlInput}/>
		<button class=btn on:click={save}>Save</button>
		<button class=btn on:click={() => showForm=false}>Cancel</button>
	</div>
{/if}

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

	.btn-row {
		@extend .row;
		justify-content: center;
		align-items: center;
		& button {
			max-width: fit-content;
		}
	}

</style>
