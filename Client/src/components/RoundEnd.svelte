<script>
  import { secretWord } from '../stores/chat-stores';

  import { randomUser } from '../stores/chat-stores';
  // console.log($randomUser);
  $: playerz = [];

  playerz = JSON.parse(sessionStorage.getItem('players'));
  console.log(typeof playerz);

  function startGame() {
    socket.emit('start', randomWords[Math.floor(Math.random() * randomWords.length)].word);
    socket.emit('drawer');
  }

  console.log($randomUser, 'hakdjfgjkagkjgfjhadf');
  console.log(playerz, 'hakdjfgjkagkjgfjhadf');
</script>

<input type="checkbox" id="my-modal" class="modal-toggle" checked />
<div class="modal">
  <div class="modal-box">
    <!-- {#if playerz.length > 0}
      {#each playerz as player}
        {#if player.id === $randomUser.id}
          <p class="py-4 text-error">
            The secret word was {$secretWord}
          </p>
        {:else}
          <p>nope</p>
        {/if}
      {/each}
    {/if} -->
    {#each playerz as player}
      <p>{player.name}</p>
    {/each}
    <h3 class="font-bold text-lg text-error">Game RULES:</h3>
  </div>
</div>
