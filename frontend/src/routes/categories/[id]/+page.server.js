import axios from "axios";
import { redirect } from '@sveltejs/kit';

/**
 * Fetches data from the habits microservice via the API gateway to retrieve a habit based on id
 * 
 * @param {*} params id for habit
 * @returns
 */
export const load = async ({ params, cookies }) => {
  try {
    const jwt = cookies.get('jwt');

    const { id } = params;
    const response = await axios.get(`http://localhost:3011/categories/${id}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const categories = response.data.data;
    return { categories };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, '/login');
    }
  }
};

export const actions = {
  deleteCategory: async ({ params, cookies }) => {
    try {
      // Retrieves the id from the url
      const { id } = params;
      const jwt = cookies.get('jwt');

      // Set the body of the request, adds a header and sends delete request to delete habit
      const data = await axios.delete(`http://localhost:3011/categories/${id}`, {
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      });

    } catch (error) {
      if (error.response.status == 401) {
        throw redirect(302, '/login');
      }
    }

    throw redirect(302, '/categories');
  }
};