import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

/**
 * Fetches data from the habits microservice via the API gateway to retrieve all habits
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ serverLoadEvent, cookies }) => {
  try {
    const jwtoken = cookies.get('jwt');
    const payload = jwt.decode(jwtoken);

    const response = await axios.get('http://localhost:3011/categories', {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });

    const categories = response.data.data;
    const userId = payload.id

    const filteredCategoriesByUser = categories.filter(category => category.user_id === userId);

    return { filteredCategoriesByUser };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, '/login');
    }
  }
};
