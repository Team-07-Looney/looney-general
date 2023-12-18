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

    const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());

    const response = await axios.get(`http://localhost:3011/users/id/${payload.id}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const user = response.data.data;
    return user;
  } catch (error) {
    console.log(error);
  }

  if (!isUserAuth) {
    throw redirect(302, "/login");
  }
};
