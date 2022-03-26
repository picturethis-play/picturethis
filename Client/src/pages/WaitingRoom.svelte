<script>
  import Button from '../components/Button.svelte';
  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');
  import { navigate } from 'svelte-routing';
  import { players } from '../stores/chat-stores';
  import { fade, fly } from 'svelte/transition';
  console.log('thesocket', socket);

  // $: players = [];

  socket.on('connect', () => {
    console.log('sox', socket.id);
    sessionStorage.setItem('socketid', socket.id);
  });

  // New Player Joined
  let name = '';
  let enteredName = false;
  function addPlayer() {
    enteredName = !enteredName;
    const player = { id: socket.id, name: name, points: 0, hasGuessed: false, isDrawer: false };
    // players.set([...$players, player]);

    // let updatedPlayers = [...$players, player];
    console.log('players😀', $players);
    // socket.emit('login', name);
    // socket.emit('login', updatedPlayers);
    socket.emit('updateStores', player);
  }

  function setPlayers(player) {
    players.set(player);
    console.log(player);
  }

  socket.on('updateStores', (player) => {
    // players.set(name);
    console.log(player);
    setPlayers(player);
    sessionStorage.setItem('players', JSON.stringify(player));
  });

  // Navigate to GamePage
  function startGame() {
    socket.emit('navigate');
    socket.emit('randomuser');
  }
  socket.on('navigate', () => {
    navigate(`/game`, { replace: true });
  });
  // function copyLink() {
  //   // let textArea =
  //   let location = window.href.location;
  //   location.select();
  //   document.execCommand('copy');
  // }
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
      {#if !enteredName}
        <Button on:message={addPlayer} name="Enter Name" />
      {/if}
      {#if $players.length > 1}
        <button on:click={startGame} class="btn btn-secondary" >Start Game</button> 
      {/if}
      <Button name="Invite Friends" />
    {/if}
  </div>
</div>
