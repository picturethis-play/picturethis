<script>
  import { timer, roundTime, gameRound, numberOfRounds, hangManMode } from '../stores/gameStates';

  let numberOfRoundsValue = $numberOfRounds;
  let roundTimeValue = $roundTime;
  let hangManModeValue = $hangManMode;



  function handleSubmit() {
    numberOfRounds.set(numberOfRoundsValue);
    roundTime.set(roundTimeValue);
    hangManMode.set(hangManModeValue);
    timer.set(roundTimeValue);
  }
</script>

<label for="my-modal-3" class="btn modal-button"
  ><ion-icon name="cog-outline" class="stroke-white h-5 w-5" /></label
>

<input type="checkbox" id="my-modal-3" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

    <div class="flex flex-col justify-center items-center m-2 p-4">
      <h2 class="text-accent">
        <label for="numberOfRounds">Number of rounds: {numberOfRoundsValue}</label>
      </h2>
      <input
        type="range"
        class="range range-sm range-secondary"
        name="numberOfRounds"
        id="numberOfRounds"
        min="1"
        max="5"
        bind:value={numberOfRoundsValue}
      />
      <div class="w-full flex justify-between text-xs text-accent px-2">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
      <br />
      <h2 class="text-accent">
        <label for="roundTime">Round time (seconds): {roundTimeValue}</label>
      </h2>
      <input
        type="range"
        class="range range-sm range-secondary"
        name="roundTime"
        id="roundTime"
        step="10"
        min="30"
        max="90"
        bind:value={roundTimeValue}
      />
      <div class="w-full flex justify-between text-xs text-accent px-2">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
      <br />
      <div class="flex gap-2">
        <label for="hangManMode" class="text-accent">HangmanMode:</label>
        <input
          name="hangmanMode"
          id="hangmanMode"
          type="checkbox"
          class="toggle toggle-accent"
          bind:checked={hangManModeValue}
        />
      </div>
      <br />
      <button
        type="button"
        value="Confirm"
        class="btn btn-outline btn-success"
        on:click={handleSubmit}>Save</button
      >
    </div>
  </div>
</div>
