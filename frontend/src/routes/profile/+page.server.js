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

  if (!isUserAuth) {
    throw redirect(302, "/login");
  }
};


export const actions = {
  /**
   * Handles the user request for changing passwords
   * @param {*} param0 
   * @returns 
   */
  changePassword: async ({ cookies, request }) => {
    const jwt = cookies.get('jwt');

    const formData = await request.formData();

    let currentPassword = formData.get('current-password');
    let newPassword = formData.get('new-password');
    let confirmNewPassword = formData.get('confirm-new-password');


    // Checks if there are any validation errors and if so returns to the form
    let errors = await validateChangingPasswordData(currentPassword, newPassword, confirmNewPassword);
    if (errors.length > 0) {
      return fail(400, { errors });
    }

    try {
      // Send request to the apigateway to register new user
      const data = await axios.post('http://localhost:3011/profile/change-password', {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      }, {
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      });

    } catch (err) {
      // In case the current password does not match the record from the database 
      errors = [
        { "input": "current-password", "message": err.response.data.data.message },
        { "input": "new-password", "message": '' },
        { "input": "confirm-new-password", "message": '' },
      ];
      return fail(400, { errors });
    }

    throw redirect(302, '/home');
  }
};

/**
 * Validates the new passwords given by the user
 * @param {*} currentPassword 
 * @param {*} newPassword 
 * @param {*} confirmNewPassword 
 * @returns 
 */
async function validateChangingPasswordData(currentPassword, newPassword, confirmNewPassword) {
  let validationIssues = [];

  if (!currentPassword) {
    validationIssues.push({ "input": "current-password", "message": "The current password is missing" });
  }

  if (!newPassword) {
    validationIssues.push({ "input": "new-password", "message": "The new password is missing" });
  }

  if (!confirmNewPassword) {
    validationIssues.push({ "input": "confirm-new-password", "message": "The confirmation of new password is missing" });
  }

  if (!(newPassword == confirmNewPassword)) {
    validationIssues.push({ "input": "new-password", "message": "The new password and the confirmation are not matching" });
    validationIssues.push({ "input": "confirm-new-password", "message": "" });
  }

  if (newPassword.length < 12) {
    validationIssues.push({ "input": "new-password", "message": "The new password should be at least 12 characters long" });
  }

  return validationIssues;
}