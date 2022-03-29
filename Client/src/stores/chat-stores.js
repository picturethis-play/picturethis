import { writable } from 'svelte/store';

import wordDb from '../assets/db';

// export const secretWord = writable(wordDb[Math.floor(Math.random() * wordDb.length)]);

export let playerName = writable('Player1');
export let playerNameSet = writable(false);

export let players = writable([]);
export let counter = writable();

export let guessedWord = writable(false);
export let drawer = writable(true);
export let secretWord = writable('');
export let secretWords = writable([]);
export let randomUser = writable('');
