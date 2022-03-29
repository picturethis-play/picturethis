<script>
  import { secretWords } from '../stores/chat-stores';

  console.log($secretWords.length, 'SSSSSSSSSECRETTTTTTTTTT');
  const playerz = JSON.parse(sessionStorage.getItem('players'));
  console.log(typeof playerz);

</script>

<input type="checkbox" id="my-modal" class="modal-toggle" checked />
<div class="modal">
  <div class="modal-box">
    <h1 class="text-error">
      The secret word was {$secretWords.length >= 2 ? $secretWords.at(-2) : $secretWords.at(-1)}
    </h1>
  </div>
</div>
