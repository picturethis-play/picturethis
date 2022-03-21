<script>
  //components
  import Message from './Chat/Message.svelte';
  import Messages from './Chat/Messages.svelte';
  import Word from './Chat/Word.svelte';
</script>

<div class="Chat__container">
  <Word />
  <Messages />
  <Message />
</div>

<style>
  .Chat__container {
    display: flex;
    flex-direction: column;
    height: 500px;
    max-width: 320px;
    border: 2px solid black;
    background-color: white;
    padding: 1rem;
  }
</style>
