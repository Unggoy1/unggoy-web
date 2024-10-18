import toast from 'svelte-french-toast';
// import type { LayoutLoad } from '../$types';
import { userGet } from '$lib/api/user';
import type { LayoutLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ fetch }) => {
  try {
    const user = await userGet({ svelteFetch: fetch });
    return {
      user: user
    };
  } catch (error) {
    throw error;
  }
};
