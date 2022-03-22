<script>
  import {
    messages,
    playerName,
    secretWord,
    guessedWord,
    gameSocket,
  } from '../../stores/chat-stores';

  let player;
  let secret;

  secretWord.subscribe((n) => {
    secret = n.word;
  });

  playerName.subscribe((name) => {
    player = name;
  });

  let userInput = '';

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  let msgsArr = []

  function handleSubmit() {
    //if user input is empty, do not add message
    if (userInput === '') {
      return;
    }

    //generate msg-object
    const msg = {
      text: userInput,
      user: player,
      player: true,
      guess: false,
      timestamp: Date.now(),
    };

    if (msg.text == secret) {
      msg.guess = true;
      guessedWord.set(true);
    }

    gameSocket.push('guess', { userInput });

    messages.subscribe((messages) => {
      msgsArr = messages;
    });

    //add message to msgs array
    messages.set([...msgsArr, msg]);

    //reset userInput
    userInput = '';
  }

  // gameSocket.on('guessmessage', (mzg) => {
  //   console.log('mzggg', mzg);
  //   messages.set([...msgsArr, msg]);
  //   // msgs = [...msgs, { user: 'dan', text: mzg.userInput }];
  // });
</script>

<div class="Message__Container">
  <input
    type="text"
    name=""
    id=""
    bind:value={userInput}
    placeholder={userInput}
    on:keydown={handleKeydown}
  />
  <input type="submit" value="Submit" on:click={handleKeydown} />
</div>

<style>
  /* your styles go here */
</style>
