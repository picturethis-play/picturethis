<script>
  import { secretWord, drawer, guessedWord } from '../../stores/chat-stores';
  let word;
  let turnToDraw;
  let guessed;

  guessedWord.subscribe((n) => {
    guessed = n;
  });

  drawer.subscribe((n) => {
    turnToDraw = n;
  });

  if (turnToDraw) {
    secretWord.subscribe((n) => {
      word = n;
    });
  } else {
    secretWord.subscribe((n) => {
      let words = [];
      for (let i = 0; i < n.word.length; i++) {
        if (n.word.charAt(i) !== ' ') {
          words.push('_');
        } else {
          words.push('&nbsp');
        }
      }
      word = words;
    });
  }
</script>

<div class="Word__Container">
  <p>
    Secret word is <strong>
      {#if turnToDraw || guessed}
        {word.word}
      {:else}
        {#each word as letter}
          <span> {@html letter} </span>
        {/each}
      {/if}
    </strong>
  </p>
</div>

<style>
</style>
