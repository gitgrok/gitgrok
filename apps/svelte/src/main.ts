import App from './app/App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'svelte',
  },
});

export default app;
