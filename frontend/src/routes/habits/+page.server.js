import { redirect } from '@sveltejs/kit';
import axios from 'axios';

/**
 * Fetches data from the habits microservice via the API gateway to retrieve all habits
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ serverLoadEvent, cookies }) => {
  try {
    const jwt = cookies.get('jwt');

    const response = await axios.get('http://localhost:3011/habits', {
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
