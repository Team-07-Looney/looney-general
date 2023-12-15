import { redirect } from '@sveltejs/kit';
import axios from 'axios';

/**
 * Fetches data from the moods microservice via the API gateway to retrieve all thoughts
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ serverLoadEvent, cookies }) => {
  try {
    const jwt = cookies.get('jwt');

    const response = await axios.get('http://localhost:3011/thoughts', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const thoughts = response.data.data;
    const thoughtsDate = response.data.meta.date;

    return { thoughts, thoughtsDate };
  } catch (error) {
    console.log(error);
     if (error.response.status == 401) {
       throw redirect(302, '/login');
     }
  }
};
