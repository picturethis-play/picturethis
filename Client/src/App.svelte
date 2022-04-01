<script>
  import io from 'socket.io-client';
  import { setContext } from 'svelte/internal';

  import Router from './pages/index.svelte';

  setContext('connect', {
    Socket: () => {
      const socket = io(process.env.SOCKET_URL);
      console.log('socket connected', socket, process.env.SOCKET_URL);
      return socket;
    },
  });
</script>

<main class="w-full h-full">
  <Router />
</main>
