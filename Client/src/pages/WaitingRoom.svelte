<script>
  import Button from '../components/Button.svelte';
  import io from 'socket.io-client';
  const socket = io('http://192.168.1.151:3000');
  import { navigate } from 'svelte-routing';
  import { players } from '../stores/chat-stores';
  import { fade } from 'svelte/transition';
  console.log('thesocket', socket);

  let name = '';
  // $: players = [];

  socket.on('connect', () => {
    console.log('sox', socket.id);
    sessionStorage.setItem('socketid', socket.id);
  });

  let enterName = true;

  function addName() {
    enterName = !enterName;
    socket.emit('login', name);
  }

  socket.on('newPlayer', (name) => {
    players.set(name);
    sessionStorage.setItem('players', name);
  });

  socket.on('navigate', () => {
    navigate(`/game`, { replace: true });
  });

  function startGame() {
    socket.emit('navigate');
    socket.emit('randomuser');
  }
  function copyLink() {
    // let textArea =
    let location = window.href.location;
    location.select();
    document.execCommand('copy');
  }
</script>

<div class="w-screen h-screen flex justify-center items-center flex-col">
  <p>
    {$players.length} people waiting to play {#each '...' as char, i}
      <span in:fade={{ delay: 1000 + i * 150, duration: 1000 }}>{char}</span>{/each}
  </p>
  <div class="mb-6 flex justify-center items-center flex-col-reverse">
    {#each $players as player}
      <p class="text-7xl">{player.name}</p>
    {/each}
  </div>
  <div class="flex items-center flex-col justify-between h-28 ">
    <input class="p-2  m-2" type="text" placeholder="" bind:value={name} />
    {#if name.length}
      {#if enterName}
        <Button on:message={addName} name="Enter Name" />
      {/if}
      {#if $players.length > 1}
        <Button on:message={startGame} name="Start Game" />
      {/if}
      <Button on:message={copyLink} name="Invite Friends" />
    {/if}
  </div>
</div>
