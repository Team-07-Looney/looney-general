import axios from 'axios';
import { fail, redirect } from '@sveltejs/kit';

/**
 * Executes during the load of the svelte page
 * @param {*} param0
*/
export const load = async ({ cookies }) => {
  try {
    // Get the cookie containing the JWT token
    const jwt = cookies.get('jwt');

    // Send request to the apigateway to check if the user is authenticated
    const isAuthenticated = await axios.get('http://localhost:3011/verify', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });
  } catch (error) {
    if (error.response.status == 401)  {
      throw redirect(302, '/login');
    }
  }
};
export const actions = {
  createThought: async ({ request, cookies }) => {
    try {
      const jwt = cookies.get('jwt');

      // Retrieves the data from the form
      const formData = await request.formData();
      const moodId = formData.get('title');
      const reasonId = formData.get('body');

      // check for errors in a form data
      const errors = await validateCreateData(moodId, reasonId);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { moodId, reasonId, errors });
      }

      // Set the body of the request, adds a header and sends post request to create record
      const data = await axios.post('http://localhost:3011/recordsMoods', {
        mood_id: moodId,
        reason_id: reasonId,
      }, {
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

    throw redirect(302, '/moods');
  }
};

async function validateCreateData(mood_id, reason_id) {
  let errors = [];
  return errors;
}