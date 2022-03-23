<script>
  import { beforeUpdate, afterUpdate } from 'svelte';
  import { messages } from '../../stores/chat-stores';

  let msgs;

  messages.subscribe((messages) => {
    msgs = messages;
  });

  // enabling chat to autoscroll
  let scroll;
  let autoscroll;

  beforeUpdate(() => {
    autoscroll = scroll && scroll.offsetHeight + scroll.scrollTop > scroll.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) scroll.scrollTo(0, scroll.scrollHeight);
  });
</script>

<div class="h-500px max-w-xs flex-1 overflow-y-auto flex flex-col items-center">
  <ul>
    {#each msgs as { user, text, guess }}
      {#if guess}
        <li class="text-green-400 break-all"><strong>{user}: </strong>{text}</li>
      {:else}
        <li class="break-all"><strong>{user}: </strong>{text} <span /></li>
      {/if}
    {/each}
  </ul>
</div>


