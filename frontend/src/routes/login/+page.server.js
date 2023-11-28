import axios from "axios";
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
  let isUserAuth = false;
  
  try {
    const jwt = cookies.get('jwt');

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

  if (isUserAuth) {
    throw redirect(302, "/habits");
  }
};

export const actions = {
  login: async ({ cookies, request }) => {
    axios.defaults.withCredentials = true

    const formData = await request.formData();

    let password = formData.get('password')
    let email = formData.get('email');

    let errors = await validateLoginData(formData);
    if (errors.length > 0) {
      return fail(400, { email, errors });
    }

    try {
      const data = await axios.post('http://localhost:3011/login', {
        password: password,
        email: email,
      }, {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      });

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