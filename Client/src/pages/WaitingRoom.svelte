<script>
  import Button from '../components/Button.svelte';
  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');
  import { navigate } from 'svelte-routing';
  import { players } from '../stores/chat-stores';
  import { fade, fly } from 'svelte/transition';
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

<div class=" w-screen h-screen flex justify-center items-center flex-col">
  <div class="flex items-center justify-center">
  <div class="flex items-center font-logo text-69xl text-primary">
    {#each 'picture' as char, i}
      <p
        class="animate-bouncer"
        in:fade={{ delay: 1000 + i * 150, duration: 1500 }}
        out:fly={{ y: -20, duration: 1000 }}
      >
        {char}
      </p>
    {/each}
  </div>
  <div class="flex items-center font-logo text-69xl text-secondary">
    {#each 'this' as char, i}
      <p
        class="animate-bouncey"
        in:fade={{ delay: 2000 + i * 150, duration: 1800 }}
        out:fly={{ y: -20, duration: 2000 }}
      >
        {char}
      </p>
    {/each}
  </div>
</div>
  <p class=" text-5xl text-primary font-logo">
    {$players.length} people waiting to play {#each '...' as char, i}
      <span in:fade={{ delay: 1000 + i * 150, duration: 1000 }}>{char}</span>{/each}
  </p>
  <div class="mb-6 flex justify-center items-center flex-col-reverse">
    {#each $players as player}
      <p class=" text-5xl text-primary font-logo">{player.name}</p>
    {/each}
  </div>
  <div class="flex items-center flex-col justify-between h-28 ">
    <p class="text-secondary">Enter name to get started</p>
    <input class="input input-bordered input-primary text-primary" type="text" placeholder="" bind:value={name} />
    {#if name.length}
      {#if enterName}
        <button on:click={addName} class="btn btn-outline">Enter Name</button>
      {/if}
      {#if $players.length > 1}
        <button on:click={startGame} class="btn btn-secondary" >Start Game</button> 
      {/if}
      <button on:click={copyLink} class="btn btn-outline">Invite Friends</button>
    {/if}
  </div>
</div>
