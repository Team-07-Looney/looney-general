import { redirect } from '@sveltejs/kit';
import axios from 'axios';

/**
 * Fetches data from the moods microservice via the API gateway to retrieve all moods
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ serverLoadEvent, cookies }) => {
  try {
    const jwt = cookies.get('jwt');

    const response1 = await axios.get('http://localhost:3011/moods', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const response2 = await axios.get('http://localhost:3011/reasons', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });
    console.log(response1)

    const moods = response1.data.data;
    const reasons = response2.data.data;
    return { moods, reasons};
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, '/login');
    }
  }
};
