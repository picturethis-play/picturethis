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

<div class="Messages__Container">
  <ul>
    {#each msgs as { user, text, guess }}
      {#if guess}
        <li class="correct"><strong>{user}: </strong>{text}</li>
      {:else}
        <li><strong>{user}: </strong>{text} <span /></li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  .Messages__Container {
    height: 500px;
    max-width: 270px;
    text-align: left;
    flex: 1 1 auto;
    overflow-y: auto;
    display: flex;
    direction: column;
    align-items: flex-end;
  }

  .correct {
    color: green;
  }

  ul {
    list-style-type: none;
  }

  li {
    margin-left: -40px;
    word-break: break-all;
  }
</style>
