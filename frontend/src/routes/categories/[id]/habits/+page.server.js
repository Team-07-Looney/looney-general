import { redirect } from '@sveltejs/kit';
import axios from 'axios';

/**
 * Fetches data from the habits microservice via the API gateway to retrieve all categories
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ serverLoadEvent, cookies, params }) => {
  try {
    const jwt = cookies.get('jwt');
    const { id } = params

    const responseCategory = await axios.get(`http://localhost:3011/categories/${id}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const responseHabits = await axios.get(`http://localhost:3011/categories/${id}/habits`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const habits = responseHabits.data.data;
    const category = responseCategory.data.data;

    return { habits, category };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, '/login');
    }
  }
};