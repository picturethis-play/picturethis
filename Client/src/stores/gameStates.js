import { writable } from 'svelte/store';

export const timer = writable(50);

export const drawerIndex = writable(0);
export const players = writable(['gaute', 'dan', 'ricky']);
export const gameRound = writable(0);
export const waitingTime = writable(10);
export const roundTime = writable(50);
export const numberOfRounds = writable(2);
export const lengthOfSecretWord = writable([]);
export const hangManMode = writable(false);