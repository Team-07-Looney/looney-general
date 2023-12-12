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

/**
 * createHabit is a function called when the user submits a form to create a habit
 */
export const actions = {
  createCategory: async ({ request, cookies }) => {
    try {
      const jwt = cookies.get('jwt');

      // Retrieves the data from the form
      const formData = await request.formData();
      const name = formData.get('name');

      // check for errors in a form data
      const errors = await validateCreateData(name);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { name, errors });
      }

      // Set the body of the request, adds a header and sends post request to create habit
      const data = await axios.post('http://localhost:3011/categories', {
        name: name,
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

    throw redirect(302, '/categories');
  }
};

async function validateCreateData(name) {
  let errors = [];

  //check if name exists
  if (!name) {
    errors.push({ "input": "name", "message": "Name is missing" });
  }

  return errors;
}