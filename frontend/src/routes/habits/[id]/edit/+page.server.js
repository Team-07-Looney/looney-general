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
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
      }
    });

    const habit = response.data.data;
    return { habit };
  } catch (error) {
    console.error(error);
  }
};

export const actions = {
    editHabit: async ({ params, request, cookies }) => {
          
      // Retrieves the data from the form
      const formData = await request.formData();
      const jwt = cookies.get('jwt');
      const { id } = params;

      // Set the body of the request, adds a header and sends put request to update habit
      const data = await axios.put(`http://localhost:3011/habits/${id}`, {
        name: formData.get('name'),
        start_time: formData.get('start_time'),
        duration: parseInt(formData.get('duration'))
      }, {
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      },)

      throw redirect(302, `/habits/${id}`);
    }
};