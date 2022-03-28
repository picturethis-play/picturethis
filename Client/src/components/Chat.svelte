<script>
  import { beforeUpdate, afterUpdate } from 'svelte';
  import { secretWord, counter } from '../stores/chat-stores';
  console.log('secret', $secretWord);

  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');

  // enabling chat to autoscroll
  let scroll;
  let autoscroll;
  let message = '';

  let messages = [];
  socket.on('chat message', (data) => {
    console.log(data);
    messages = [...messages, { user: data.user.name, message: data.message }];
  });

  // let xwxwplayerId;
  let data = sessionStorage.getItem('socketid');
  // socket.on('new', (d) => {
  //   socket.emit('getUsers');
  //   console.log('socket', d);
  //   playerId = d;
  // });

  function sendMessage() {
    if (message === '') {
      return;
    }

    socket.emit('chat message', { message, data });
    message = '';
  }

  // let sentFrom;
  // socket.on('usersending', (id) => {
  //   sentFrom = id;
  // });

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
    const points = $counter;
    return points;
  }
  console.log(counter);
</script>

<div
  class="flex flex-col xl:h-xl lg:h-rr lg:mt-4 md:h-48 w-72 max-w-xs border-2 rounded-md border-solid border-secondary shadow-69xl shadow-secondary bg-neutral"
>
  <div class="max-w-xs text-left flex-auto overflow-y-auto flex flex-col p-4 text-secondary" bind:this={scroll}>
    <ul>
      {#each messages as text}
        {#if text.message === $secretWord}
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
