import axios from 'axios';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

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
      const jwtoken = cookies.get('jwt');
      const payload = jwt.decode(jwtoken);

      // Retrieves the data from the form
      const formData = await request.formData();
      const name = formData.get('name');
      const iconId = formData.get('icon_id');

      // check for errors in a form data
      const errors = await validateCreateData(name, iconId);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { name, iconId, errors });
      }

      // Set the body of the request, adds a header and sends post request to create habit
      const data = await axios.post('http://localhost:3011/categories', {
        name: name,
        icon_id: iconId,
        user_id: payload.id
      }, {
        headers: {
          "Authorization": `Bearer ${jwtoken}`,
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      });
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        throw redirect(302, '/login');
      }
    }

    throw redirect(302, '/categories');
  }
};

async function validateCreateData(name, iconId) {
  let errors = [];

  //check if name exists
  if (!name) {
    errors.push({ "input": "name", "message": "Name is missing" });
  }

  //check if an icon had been selected
  if (!iconId) {
    errors.push({ "input": "icon_id", "message": "You need to select an icon" });
  }

  return errors;
}