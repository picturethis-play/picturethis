<script>
  import { timer, roundTime, gameRound, numberOfRounds, hangManMode } from '../stores/gameStates';

  let numberOfRoundsValue = $numberOfRounds;
  let roundTimeValue = $roundTime;
  let hangManModeValue = $hangManMode;

  function consoleLogs(state) {
    console.log('State: ', state, ':')
    console.log('numberOfRounds: ', $numberOfRounds);
    console.log('roundTime: ', $roundTime);
    console.log('hangManMode: ', $hangManMode);
  }

  function handleSubmit() {

    consoleLogs('Old');
    numberOfRounds.set(numberOfRoundsValue);
    roundTime.set(roundTimeValue);
    hangManMode.set(hangManModeValue)
    consoleLogs('Current');
  }
</script>

<div class="flex flex-col justify-center items-center m-2">
  <p>Settings</p>

  <label for="numberOfRounds">Number of rounds: {numberOfRoundsValue}</label>
  <input
    type="range"
    name="numberOfRounds"
    id="numberOfRounds"
    min="1"
    max="5"
    bind:value={numberOfRoundsValue}
  />

  <label for="roundTime">Round time (seconds): {roundTimeValue}</label>
  <input
    type="range"
    name="roundTime"
    id="roundTime"
    step="10"
    min="30"
    max="90"
    bind:value={roundTimeValue}
  />

  <label for="hangManMode">HangmanMode:</label>
  <input name="hangmanMode" id="hangmanMode" type="checkbox" class="toggle" bind:checked={hangManModeValue} />

  <label for="hangManMode">Checkbox:</label>
  <input name="hangmanMode" id="hangmanMode" type="checkbox" class="checkbox" bind:checked={hangManModeValue} />


  <input type="button" value="Confirm" class="p-2" on:click={handleSubmit} />
</div>
