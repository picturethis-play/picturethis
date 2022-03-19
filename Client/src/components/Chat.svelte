<script>
  import { beforeUpdate, afterUpdate } from 'svelte';

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
    {
      text: 'Welcome!',
      user: 'Picture',
      player: false,
      guess: false,
      timestamp: 1,
    },
    {
      text: 'What is your guess?',
      user: 'This',
      player: true,
      guess: false,
      timestamp: 2,
    },
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
    const msg = {
      text: userInput,
      user: playerName,
      player: true,
      guess: false,
      timestamp: timestamp,
    };

    //check if guess is correct
    if (msg.text === secretWord) {
      msg.guess = true;
    }
    //increment mocktimestamp
    timestamp++;

    //add message to msgs array
    msgs = [...msgs, msg];

    //reset userInput
    userInput = '';
  }
</script>

<div class="chat">
  <div class="messages" bind:this={scroll}>
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

  <div class="user-input">
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

<style>
  .chat {
    display: flex;
    flex-direction: column;
    height: 500px;
    max-width: 320px;
    border: 2px solid black;
    background-color: white;
  }

  .messages {
    height: 500px;
    max-width: 270px;
    text-align: left;
    flex: 1 1 auto;
    overflow-y: auto;
    display: flex;
    direction: column;
    align-items: flex-end;
  }

  ul {
    list-style-type: none;
  }

  li {
    margin-left: -40px;
    word-break: break-all;
  }

  .correct {
    color: green;
  }
</style>
