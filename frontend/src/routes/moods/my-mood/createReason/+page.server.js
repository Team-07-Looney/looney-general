import axios from 'axios';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  createReason: async ({ request, cookies}) => {
    
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

      // Set the body of the request, adds a header and sends post request to create record
      const data = await axios.post('http://localhost:3011/reasons', {
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

    throw redirect(302, '/moods/my-mood');
  }
};

async function validateCreateData(name) {
  let errors = [];
  if (!name) {
    errors.push({ "input": "name", "message": "Your reason is missing" });
  }
  return errors;
}