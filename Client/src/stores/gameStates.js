import { derived, writable } from 'svelte/store';

export const gameStarted = writable(false);

//player states
export const drawing = writable(false);
export const guessing = writable(false);

export const guessedWord = writable(false);

export const secretWord = writable('HORSE');
export const secretWordLength = derived(secretWord, (word) => word.length);

export const timer = writable(10);

export const drawerIndex = writable(0);
export const players = writable(['gaute', 'dan', 'ricky']);
export const gameRound = writable(1);
export const waitingTime = writable(5);
export const roundTime = writable(10);
