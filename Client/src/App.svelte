<script>
  import io from 'socket.io-client';
  import { setContext } from 'svelte/internal';

  import Router from './pages/index.svelte';
  const socket = io(process.env.SOCKET_URL);                          //<--------------------process.env.SOCKET_URL

  setContext('connect', {
    Socket: () => {
      return socket;
    },
  });
</script>

<main class="w-full h-full">
 <Router/>
</main>
