<script>
  import { onMount } from 'svelte';

  import { timer, waitingTime, roundTime } from '../stores/gameStates';

  setInterval(() => {
    if ($timer === 0) {
      timer.set($roundTime + $waitingTime);
    }
    timer.set($timer - 1);
  }, 1000);

  let setTime;
  onMount(() => {
    //Need to set this so the value of the progressbar percentage is correct for any timer
    setTime = $timer;
  });
</script>

<div class="w-full">
  <div class="h-5 w-full overflow-hidden rounded-md bg-gray-200">
    {#if $timer > 3}
      <div class="h-full bg-blue-600" style="width: {($timer * 100) / setTime}%" />
    {:else}
      <div class="h-full bg-red-600" style="width: {($timer * 100) / setTime}%" />{/if}
  </div>
  <div class="radial-progress text-primary" style="--value:{($timer * 100) / setTime};">
    {($timer * 100) / setTime}%
  </div>
</div>
