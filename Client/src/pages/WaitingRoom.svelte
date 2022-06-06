<script>
  import { getContext } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { players } from '../stores/chat-stores';
  import { fade, fly } from 'svelte/transition';
  import { themeChange } from 'theme-change';
  import { onMount } from 'svelte';
  import Settings from '../components/Settings.svelte';
  let carousel;
  let round = true;

  const { Socket } = getContext('connect');
  const socket = Socket();
  console.log(socket.id);
  console.log(socket);
  onMount(() => {
    themeChange(false);
    // 👆 false parameter is required for svelte
  });
  // $: players = [];
  // socket.on('connect', () => {
  //   console.log('sox', socket.id);
  //   socket.emit('room', );
  //   sessionStorage.setItem('socketid', socket.id);
  // });
  const icons = [
    { icon: 'logo-react', color: 'text-blue-500' },
    { icon: 'logo-npm', color: 'text-red-500' },
    { icon: 'logo-github', color: 'text-black-500' },
    { icon: 'logo-css3', color: 'text-blue-500' },
    { icon: 'logo-chrome', color: 'text-green-500' },
    { icon: 'logo-figma', color: 'text-purple-500' },
    { icon: 'logo-html5', color: 'text-orange-500' },
    { icon: 'logo-sass', color: 'text-pink-500' },
    { icon: 'logo-vercel', color: 'text-black-500' },
  ];

  // NEW PLAYER
  let name = '';
  let enteredName = false;
  function addPlayer() {
    enteredName = !enteredName;
    const player = {
      id: socket.id,
      name: name,
      points: 0,
      hasGuessed: false,
      isDrawer: false,
      icon: icons[Math.floor(Math.random() * icons.length)],
    };
    console.log('players😀', $players);
    socket.emit('updateStores', player);
    name = '';
  }

  function setPlayers(player) {
    players.set(player);
    console.log(player);
  }

  socket.on('updateStores', (player) => {
    console.log(player);
    setPlayers(player);
    sessionStorage.setItem('players', JSON.stringify(player));
  });

  //NAVIGATE TO GAME PAGE
  function navigateToGamePage() {
    socket.emit('navigate');
    // socket.emit('drawer');
  }

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      addPlayer();
    }
  }
  let room = '';
  socket.on('room', (data) => {
    console.log(data);
    room = data;
  });

  socket.on('navigate', (drawer) => {
    navigate(`/game`, { replace: true });
    sessionStorage.setItem('drawer', JSON.stringify(drawer));
  });
</script>

<div class=" w-screen h-screen flex sm:flex-col justify-center items-center flex-col">
  <div class="flex items-center justify-center">
    <div class="flex items-center font-logo text-69xl sm:text-5xl md:text-10xl text-primary">
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
    <div class="flex items-center font-logo text-69xl sm:text-5xl md:text-10xl text-secondary">
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
  <p class=" text-5xl sm:text-2x text-neutral-content font-logo">
    <span class="text-info">room name:</span> {room}
  </p>
  <div class="carousel rounded-box w-40 gap-5 " id="carousel">
    {#each $players as player, i}
      <div class="carousel-item animate-scrolling">
        <p class="text-5xl text-accent font-logo ">{player.name}</p>
      </div>
    {/each}
  </div>
  <div class="flex items-center flex-col justify-between">
    <p class="text-secondary">Enter name to get started</p>
    {#if !enteredName}
      <input
        class="input input-bordered input-primary text-primary text-2xl sm:w-64"
        type="text"
        placeholder=""
        on:keydown={handleKeydown}
        bind:value={name}
      />
    {/if}
    {#if name.length}
      {#if !enteredName}
        <button on:click={addPlayer} class="btn btn-outline mt-2">Enter Name</button>
      {/if}
    {/if}
    {#if $players.length > 1}
      <button on:click={navigateToGamePage} class="btn btn-secondary mt-2">Start Game</button>
    {/if}
    <div class="tooltip tooltip-accent" data-tip="click to copy link to clipboard!">
      <button class="btn btn-primary mt-2">Invite Friends</button>
    </div>
  </div>
  <div class="m-2">
    <Settings />
  </div>
  <input
    type="checkbox"
    class="toggle mt-1"
    data-toggle-theme="emerald,dracula"
    data-act-class="ACTIVECLASS"
  />🌚/🌞
</div>
