<script>
  import { beforeUpdate, afterUpdate } from 'svelte';

  export let gameSocket;

  // enabling chat to autoscroll
  let scroll;
  let autoscroll;

  beforeUpdate(() => {
    autoscroll = scroll && scroll.offsetHeight + scroll.scrollTop > scroll.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) scroll.scrollTo(0, scroll.scrollHeight);
  });

  let userInput = '';

  //testing of right guess mechanic
  let secretWord = 'Cheese';

  //hardcoded for now
  const playerName = 'Paula';

  //mock msgs
  let msgs = [
    // {
    //   text: 'Welcome!',
    //   user: 'Picture',
    //   player: false,
    //   guess: false,
    //   timestamp: 1,
    // },
    // {
    //   text: 'What is your guess?',
    //   user: 'This',
    //   player: true,
    //   guess: false,
    //   timestamp: 2,
    // },
    // { user: 'dan', text: 'hello' },
    // { user: 'dan', text: 'hi' },
  ];

  //mock timestamp
  let timestamp = 3;

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  function handleSubmit() {
    //if user input is empty, do not add message
    if (userInput === '') {
      return;
    }

    //generate msg-object
    // const msg = {
    //   text: userInput,
    //   user: playerName,
    //   player: true,
    //   guess: false,
    //   timestamp: timestamp,
    // };

    //check if guess is correct
    // if (msg.text === secretWord) {
    //   msg.guess = true;
    // }
    //increment mocktimestamp
    timestamp++;

    //add message to msgs array

    gameSocket.push('guess', { userInput });
    //reset userInput
    userInput = '';
  }

  gameSocket.on('guessmessage', (mzg) => {
    console.log('mzggg', mzg);
    msgs = [...msgs, { user: 'dan', text: mzg.userInput }];
  });
</script>

<div class="flex flex-col h-500px max-w-xs border-2 border-solid border-black bg-white">
  <div class="h-500px max-w-xs text-left flex-auto overflow-y-auto flex flex-col items-end" bind:this={scroll}>
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

  <div >
    <input
      type="text"
      name=""
      id=""
      bind:value={userInput}
      placeholder="Type your message.."
      on:keydown={handleKeydown}
    />
    <input type="submit" value="Submit" on:click={handleSubmit} />
  </div>
</div>
