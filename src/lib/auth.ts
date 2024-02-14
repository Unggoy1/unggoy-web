// src/lib/auth.ts

import { writable } from 'svelte/store';

// Initialize the store with an initial value (e.g., false for unauthenticated)
export const authenticated = writable(false);
