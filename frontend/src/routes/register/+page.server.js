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
  register: async ({ cookies, request }) => {
    axios.defaults.withCredentials = true

    const formData = await request.formData();

    let name = formData.get('name');
    let password = formData.get('password')
    let email = formData.get('email');

    let errors = await validateRegistrationData(formData);
    if (errors.length > 0) {
      return fail(400, { email, name, errors });
    }

    try {
      const data = await axios.post('http://localhost:3011/register', {
        name: name,
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
      if (err.response.data.data.details == "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email") {
        errors = [{ "input": "email", "message": "This email is already in use" }];
        return fail(400, { email, name, errors });
      }
    }

    throw redirect(302, '/habits');
  }
};

async function validateRegistrationData(formData) {
  let email = formData.get('email');
  let name = formData.get('name');
  let password = formData.get('password');
  let confirmPassword = formData.get('confirm-password');

  let validationIssues = [];

  if (!email) {
    validationIssues.push({ "input": "email", "message": "The email is missing" });
  } else {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.get('email'))) {
      validationIssues.push({ "input": "email", "message": "The email that has been provided is invalid" });
    }
  }

  if (!name) {
    validationIssues.push({ "input": "name", "message": "The name is missing" });
  }

  if (!(password && confirmPassword)) {
    validationIssues.push({ "input": "password", "message": "The passwords are missing" });
  } else if (password != confirmPassword) {
    validationIssues.push({ "input": "password", "message": "The password are not matching" });
  }

  return validationIssues;
}