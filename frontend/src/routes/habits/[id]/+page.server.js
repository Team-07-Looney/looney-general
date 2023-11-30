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
    const response = await axios.get(`http://localhost:3011/habits/${id}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const habit = response.data.data;
    return { habit };
  } catch (error) {
    console.error(error);
  }
};

export const actions = {
  deleteHabit: async ({ params, request, cookies }) => {

    const jwt = cookies.get('jwt');

    // Retrieves the id from the url
    const { id } = params;

    // Set the body of the request, adds a header and sends delete request to delete habit
    const data = await axios.delete(`http://localhost:3011/habits/${id}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
      }
    });

    throw redirect(302, '/habits');
  }
};
