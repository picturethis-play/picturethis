<script>
  import { navigate } from 'svelte-routing';
  import { getContext } from 'svelte';
  function navigation() {
    navigate(`/`, { replace: true });
  }
  const { Socket } = getContext('connect');
  const socket = Socket();
  // $: players = [];

  $: players = JSON.parse(sessionStorage.getItem('players'));
//////////////////////////////////////////////////////////////

  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  onMount(() => {
    playerz = JSON.parse(sessionStorage.getItem('players'));
  });

  const resetPoints = () => {
    setTimeout(() => {
      newPoints = 0;
    }, 2500);
  };
  $: drawer = JSON.parse(sessionStorage.getItem('drawer'));

  socket.on('drawer', (drawerz) => {
    // drawer = JSON.parse(sessionStorage.getItem('drawer'));
    drawer = drawerz;
  });

  $: playerz = [];
  $: newPoints = 0;
  $: pointsAddedTo = [];
  socket.on('addPoints', ({ pointsAdded, data }) => {
    let playerx = JSON.parse(sessionStorage.getItem('players'));
    playerz = playerx.sort((a, b) => b.points - a.points);
    newPoints = pointsAdded;
    pointsAddedTo = data;
    resetPoints();
  });

</script>

<input type="checkbox" id="my-modal-5" class="modal-toggle" checked />
<div class="modal">
  <div class="modal-box w-11/12 max-w-5xl flex justify-between">
    <!-- {#if players}
      {#each players as player}
        <p>{player.name} {player.points}</p>
      {/each}
    {/if} -->
    <div>
      {#if playerz.length > 0}
      {#each playerz as user, i}
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
                  <p class="text-2x text-accent">{user.name} {#if i === 0}🏆{/if}</p>
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
    <div class="modal-action">
      <label for="my-modal-5" class="btn" on:click={navigation}>Start another game!</label>
    </div>
  </div>
</div>
