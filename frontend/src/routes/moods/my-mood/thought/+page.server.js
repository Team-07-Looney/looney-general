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