<script>
  import Header from '../components/Header.svelte';
  import Button from '../components/Button.svelte';
  import AvatarSelect from '../components/AvatarSelect.svelte';
  import { Link } from 'svelte-routing'
  import { fade, fly } from 'svelte/transition';
  $: visible = true;

  function visibility() {
    visible = !visible;
    console.log('hi')
  }
</script>

<!-- <label>
  <input type="checkbox" bind:checked={visible} />
</label> -->

<div class="container">
  <div class="logo">
    <!-- <Header /> -->
    <div class="centered">
      {#if visible}
        {#each 'picturethis' as char, i}
          <h1
            in:fade={{ delay: 1000 + i * 150, duration: 1500 }}
            out:fly={{ y: -20, duration: 1000 }}
          >
            {char}
          </h1>
        {/each}
      {/if}
    </div>
  </div>

  <div class="avatar">
    <AvatarSelect />
  </div>

  <div class="buttons">
    <Link to="game" on:message={visibility}><Button name="Create Room"/></Link>
    <Button name="Join Room" />
  </div>
</div>

<style>
  .container {
    background-color: #bdc3d5;
    height: 820px;
    width: 100%;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #bdc3d5;
    /* color: white; */
    width: 100%;
  }
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 50px;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    border-top: 150px;
  }
  .centered {
    display: flex;
    font-size: 32px;
    height: 150px;
  }
</style>
