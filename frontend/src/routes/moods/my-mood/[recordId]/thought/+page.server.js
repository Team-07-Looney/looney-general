import axios from 'axios';
import { fail, redirect } from '@sveltejs/kit';

/**
 * Executes during the load of the svelte page
 * @param {*} param0 
 */
export const load = async ({ cookies, params }) => {
  let isUserAuth = false;
  const { recordId } = params;
  try {
    // Get the cookie containing the JWT token
    const jwt = cookies.get('jwt');

    // Send request to the apigateway to check if the user is authenticated
    const isAuthenticated = await axios.get('http://localhost:3011/verify', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    if (isAuthenticated.data.message == "User is authenticated") {
      isUserAuth = true;
    }
    return { recordId }
  } catch (error) {
    console.log(error);
  }


  // If they are authenticated they should not be able to access the login
  // Svelte issue with throwing redirect within a try-catch block workaround
  if (!isUserAuth) {
    throw redirect(302, "/login");
  }
};

export const actions = {
  createThought: async ({ request, cookies, params }) => {
    
    const { recordId } = params;
  
    try {
      const jwt = cookies.get('jwt');

      // Retrieves the data from the form
      const formData = await request.formData();
      const title = formData.get('title');
      const body = formData.get('body');

      // check for errors in a form data
      const errors = await validateCreateData(title, body);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { title, body, errors });
      }

      // Set the body of the request, adds a header and sends post request to create record
      const data = await axios.post('http://localhost:3011/thoughts', {
        title: title,
        body: body,
        record_id: recordId
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

    throw redirect(302, `/moods/my-mood/${recordId}/thought/advice`);
  }
};

async function validateCreateData(title, body) {
  let errors = [];
  if (!title) {
    errors.push({ "input": "title", "message": "Title is missing" });
  }
  if (!body) {
    errors.push({ "input": "body", "message": "Your story is missing" });
  }
  return errors;
}