<script>
  let name = ['gaut', 'dan', 'rick'];
  let index = 0;
  function nextPerson() {
    if (index === 2) {
      index = 0;
    } else {
      index = index + 1;
    }
  }
  function prevPerson() {
    if (index === 0) {
      index = 2;
    } else {
      index = index - 1;
    }
  }
</script>

<main>
  <h1>Hello {name[index]}!</h1>
  <button on:click={prevPerson}>Prev</button>

  <button on:click={nextPerson}>Next</button>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
