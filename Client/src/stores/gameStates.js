import { writable } from 'svelte/store';

export const timer = writable(10);

export const drawerIndex = writable(0);
export const players = writable(['gaute', 'dan', 'ricky']);
export const gameRound = writable(0);
export const waitingTime = writable(10);
export const roundTime = writable(10);
export const numberOfRounds = writable(3);
export const lengthOfSecretWord = writable([]);
