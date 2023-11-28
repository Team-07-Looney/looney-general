import axios from "axios";
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

/**
 * Executes during the load of the svelte page
 * @param {*} param0 
 */
export const load = async ({ cookies }) => {
  let isUserAuth = false;

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
  } catch (error) {
    console.log(error);
  }


  // If they are authenticated they should not be able to access the login
  // Svelte issue with throwing redirect within a try-catch block workaround
  if (isUserAuth) {
    throw redirect(302, "/habits");
  }
};

export const actions = {
  /**
   * Handles the login request for registration
   * @param {*} param0 
   * @returns 
   */
  login: async ({ cookies, request }) => {
    axios.defaults.withCredentials = true

    const formData = await request.formData();

    let password = formData.get('password')
    let email = formData.get('email');

    // Checks if there are any validation errors and if so returns to the form
    let errors = await validateLoginData(formData);
    if (errors.length > 0) {
      return fail(400, { email, errors });
    }

    try {
      // Sends a request to the API gateway to try and login the user
      const data = await axios.post('http://localhost:3011/login', {
        password: password,
        email: email,
      }, {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      });

      // Sets new cookie that contains the JWT token of the user
      cookies.set('jwt', data.data.data.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 // 1 day
      });
    } catch (err) {
      if (err.response.data.data.message == 'Issue with the credentials') {
        errors = [{ "input": "email", "message": "There seems to be an issue with the credentials" },
        { "input": "password", "message": "" }];
      }

      return fail(400, { email, errors });
    }

    throw redirect(302, '/habits');
  }
};

/**
 * Validates the user login data
 * @param {*} formData the form that contains the data
 * @returns array of errors caused by validation fails
 */
async function validateLoginData(formData) {
  let email = formData.get('email');
  let password = formData.get('password');

  let validationIssues = [];

  if (!email) {
    validationIssues.push({ "input": "email", "message": "The email is missing" });
  } else {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.get('email'))) {
      validationIssues.push({ "input": "email", "message": "The email that has been provided is invalid" });
    }
  }

  if (!(password)) {
    validationIssues.push({ "input": "password", "message": "The password is missing" });
  }

  return validationIssues;
}