import axios from "axios";
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

/**
 * Executes during the load of the svelte page
 * @param {*} param0 
 */
export const load = async ({ cookies }) => {
  let isUserAuth = false;

  try {
    // Get the cookie containing the JWT token
    const jwtoken = cookies.get('jwt');
    const payload = jwt.decode(jwtoken);

    const response = await axios.get(`http://localhost:3011/users/id/${payload.id}`, {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });

    const user = response.data.data;
    const originalUsername = user.username

    // Checks that the username is no longer than 12 or returns a shorter version
    function checkUsernameLength(name) {
      if (name.length > 12) {
        // Finds the index of the first space
        const spaceIndex = name.indexOf(' ');
    
       // Returns the string within the first space
        if (spaceIndex !== -1) {
          user.checkedUsername = name.substring(0, spaceIndex);
        } else {
          // Returns the first 10 characters and adds ...
          user.checkedUsername = name.substring(0, 10) + "...";
        }
      } else {
        user.checkedUsername = name;
      } 
    }
    
    checkUsernameLength(originalUsername);

   return { user };
  } catch (error) {
    console.log(error);
  }

  if (!isUserAuth) {
    throw redirect(302, "/login");
  }
};
