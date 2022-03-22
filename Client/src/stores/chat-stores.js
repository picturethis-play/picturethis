import { writable } from 'svelte/store';

import wordDb from '../assets/db';

export const secretWord = writable(
  wordDb[Math.floor(Math.random() * wordDb.length)]
);

export let playerName = writable('Player1');
export let messages = writable([
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
    player: false,
    guess: false,
    timestamp: 2,
  },
  {
    text: 'Hmm, let us hear it...',
    user: 'Stores',
    player: false,
    guess: true,
    timestamp: 3,
  },
]);

export let guessedWord = writable(false)
export let drawer = writable(false)

