<script>
  // your script goes here

  import { playerName, playerNameSet } from '../../stores/chat-stores';

  let userInput = '';

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  function handleSubmit() {
    //if user input is empty, do not add message
    if (userInput === '') {
      //Change user name to a random name
      let randomNames = ['James Bondiquez', 'Candice Richard', 'Ugen M. Bien'];
      let randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
      playerName.set(randomName);
    } else {
      playerName.set(userInput);
    }
    playerNameSet.set(true);
  }
</script>

<div class="Message__Container">
  <input
    type="text"
    name=""
    id=""
    bind:value={userInput}
    placeholder="Please input your name, or press enter to get a random name"
    on:keydown={handleKeydown}
  />
  <input type="submit" value="Submit" on:click={handleKeydown} />
</div>

<!-- markup (zero or more items) goes here -->
<style>
  /* your styles go here */
</style>
