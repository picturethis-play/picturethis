import { derived, writable } from "svelte/store";

export const gameStarted = writable(false)


//player states
export const drawing = writable(false)
export const guessing = writable(false)

export const guessedWord = writable(false)

export const secretWord = writable('HORSE')
export const secretWordLength = derived(secretWord, word => word.length)

export const timer = writable(60)