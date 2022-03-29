<script>
  import { secretWord } from '../stores/chat-stores';
</script>

<input type="checkbox" id="my-modal" class="modal-toggle" checked />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg text-error">Game RULES:</h3>
    <p class="py-4 text-error">
      The secret word was {$secretWord}
    </p>
    <div class="modal-action">
      <label for="my-modal" class="btn btn-accent">Lets goooo!</label>
    </div>
  </div>
</div>
