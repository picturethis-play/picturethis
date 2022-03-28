<script>
  //components
  import Message from './Chat/Message.svelte';
  import Messages from './Chat/Messages.svelte';
  import Word from './Chat/Word.svelte';
  import { playerNameSet } from '../stores/chat-stores';
  import InputName from './Chat/InputName.svelte';
  import GameState from './GameState.svelte';

  let playerNameSetVal;

  playerNameSet.subscribe((n) => {
    playerNameSetVal = n;
  });
</script>

<div class="flex flex-col">
  <div><GameState /></div>
  <div class="flex flex-col h-full max-w-xs border-2 border-solid border-black p-2">
    <Word />
    <Messages />

    {#if playerNameSetVal}
      <Message />
    {:else}
      <InputName />
    {/if}
  </div>
</div>
