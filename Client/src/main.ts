import App from './App.svelte';
import '../public/index.css'

const app = new App({
  target: document.body,
  hydrate: true
});

export default app;
