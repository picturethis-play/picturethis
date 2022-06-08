<script>
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  const { Socket } = getContext('connect');
  const socket = Socket();
  import { game } from '../stores/chat-stores'
  console.log(game)
  game.subscribe(roomName => {
    console.log(roomName, 'yezzzz')
    room = roomName;
  })
  console.log(room, 'room thing works champ')
  ///////////////////////////////HERE IS WHERE U LEFT OFF IDIOT ????????????????????
  playerz = JSON.parse(sessionStorage.getItem('players')).filter(player => player.room == room)
  console.log(playerz, 'normal style')

  const resetPoints = () => {
    setTimeout(() => {
      newPoints = 0;
    }, 2500);
  };
  $: drawer = JSON.parse(sessionStorage.getItem('drawer'));
  
  socket.on('drawer', (drawerz) => {
    // drawer = JSON.parse(sessionStorage.getItem('drawer'));
    console.log(drawerz, 'drawer');
    drawer = drawerz;
  });
  $: room = '';
  $: playerz = [];
  $: newPoints = 0;
  $: pointsAddedTo = [];
  socket.on('addPoints', ({ pointsAdded, data }) => {
    let playerx = JSON.parse(sessionStorage.getItem('players'))
    playerz = playerx.sort((a, b) => b.points - a.points);
    newPoints = pointsAdded;
    pointsAddedTo = data;
    resetPoints();
  });
</script>

<div
  class="border-2 rounded-md border-secondary shadow-69xl shadow-secondary overflow-y-auto w-box xl:h-xl lg:h-rr lg:mb-2 sm:h-36 sm:w-96 md:h-48 md:w-df bg-neutral p-3"
>
  {#if playerz.length > 0}
    {#each playerz as user}
      <div class="stats w-full mt-2">
        <div class="stat flex">
          <div class="flex items-center justify-center">
            <div>
              <div class="w-16">
                <ion-icon size="large" name={user.icon.icon} class={user.icon.color} />
              </div>
            </div>
          </div>
          <div>
            <div class="stat-title">
              {#if user.id === drawer.id}
                <p class="text-2x text-primary">{user.name} ✍️</p>
              {:else}
                <p class="text-2x text-accent">{user.name}</p>
              {/if}
            </div>
            <div class="flex">
              <div class="stat-value">{user.points}</div>
              <div class="stat-value">
                {#if pointsAddedTo === user.id}
                  {#if newPoints !== 0}
                    <span class="text-green-600" transition:fade={{ duration: 1000 }}
                      >+{newPoints}</span
                    >
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>
