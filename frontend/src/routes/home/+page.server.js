import { redirect } from '@sveltejs/kit';
import axios from 'axios';

/**
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ serverLoadEvent, cookies }) => {
  try {
    const jwt = cookies.get('jwt');

    const response = await axios.get('http://localhost:3011/home', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const habits = response.data.data;
    return { habits };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, '/login');
    }
  }
};
