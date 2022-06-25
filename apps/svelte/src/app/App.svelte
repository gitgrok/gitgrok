<script lang="ts">
import RepoList from "./components/RepoList.svelte";
</script>

<main class="hero">
	<h1>@GITGROK</h1>
  <RepoList />
</main>

<style lang="scss">
	@import "@onivoro/browser-layout/index";
  	@import "@onivoro/browser-layout/hero";
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
