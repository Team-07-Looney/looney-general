import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
  const jwt = cookies.get('jwt');
  cookies.delete('jwt');

  throw redirect(302, '/login');
}