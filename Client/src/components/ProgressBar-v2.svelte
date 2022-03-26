<script>
  import { onMount } from 'svelte';

  import { timer } from '../stores/gameStates';



  let setTime;
  onMount(() => {
    //Need to set this so the value of the progressbar percentage is correct for any timer
    setTime = $timer;
  });
</script>

<div class="w-full">
  <div class="h-5 w-full overflow-hidden rounded-md bg-gray-200">
    <div
      class="h-full bg-blue-600 "
      style="width: {($timer * 100) / setTime}%"
    />
  </div>
</div>