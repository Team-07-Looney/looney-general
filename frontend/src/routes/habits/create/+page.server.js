import axios from 'axios';
import { redirect } from '@sveltejs/kit';

/**
 * createHabit is a function called when the user submits a form to create a habit
 */
export const actions = {
  createHabit: async ({ request, cookies }) => {
    const jwt = cookies.get('jwt');

    // Retrieves the data from the form
    const formData = await request.formData();

    // Set the body of the request, adds a header and sends post request to create habit
    const data = await axios.post('http://localhost:3011/habits', {
      name: formData.get('name'),
      start_time: formData.get('start_time'),
      duration: parseInt(formData.get('duration'))
    }, {
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
      }
    });
    

    throw redirect(302, '/habits');
  }
};