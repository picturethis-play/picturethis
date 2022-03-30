<script>
  import { beforeUpdate, afterUpdate } from 'svelte';
  import { counter, secretWords } from '../stores/chat-stores';
  import { timer } from '../stores/gameStates';
  import { fade, fly } from 'svelte/transition';

  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');

  // enabling chat to autoscroll
  let scroll;
  let autoscroll;
  let message = '';

  let messages = [];
  socket.on('chat message', (data) => {
    console.log(data);
    messages = [...messages, { user: data.user.name, message: data.message, guessed: false }];
  });

  let data = sessionStorage.getItem('socketid');

  $: pointsAdded = 0;

  function sendMessage() {
    if (message === '') {
      return;
    }

    let pointCount = setPoints();
    socket.emit('chat message', { message, data });
    if (message === $secretWords.at(-1)) {
      pointsAdded = pointCount;
      socket.emit('points', { data, pointCount, pointsAdded });
    }
    message = '';
  }

  beforeUpdate(() => {
    autoscroll = scroll && scroll.offsetHeight + scroll.scrollTop > scroll.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) scroll.scrollTo(0, scroll.scrollHeight);
  });

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
  function setPoints() {
    const points = $timer;
    console.log($timer);
    return points;
  }
</script>

<div
  class="flex flex-col justify-start xl:h-xl lg:h-rr lg:mt-4 sm:h-48 sm:w-500 md:w-df md:h-48 sm:w-96 border-2 rounded-md border-solid border-secondary shadow-69xl shadow-secondary bg-neutral"
>
  <div
    class="max-w-xs md:w-df text-left flex-auto overflow-y-auto flex flex-col p-4 text-secondary"
    bind:this={scroll}
  >
    <ul>
      {#each messages as text}
        {#if text.message === $secretWords.at(-1)}
          <li class="break-all text-green-500">
            {text.user} guessed the word
          </li>
        {:else}
          <li class="break-all">{text.user}: <span class="text-white">{text.message}</span></li>
        {/if}
      {/each}
    </ul>
  </div>

  <div>
    <input
      class="input input-ghost input-sm text-secondary w-70 ml-1.5 mb-1"
      type="text"
      name=""
      id=""
      bind:value={message}
      placeholder="Enter your guess here...."
      on:keydown={handleKeydown}
    />
    <!-- <input type="submit" value="Submit" on:click={sendMessage} /> -->
  </div>
</div>
