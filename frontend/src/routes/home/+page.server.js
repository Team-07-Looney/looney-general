import axios from "axios";
import { redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

/**
 * Executes during the load of the svelte page
 * @param {*} param0 
 */
export const load = async ({ cookies }) => {
  const isUserAuth = false;

  try {
    // Get the cookie containing the JWT token
    const jwtToken = cookies.get("jwt");
    const payload = jwt.decode(jwtToken);

    const response = await axios.get(`http://apigateway:3011/users/id/${payload.id}`, {
      headers: {
        "Authorization": `Bearer ${jwtToken}`
      }
    });

    const user = response.data.data;
    user.checkedUsername = truncateUsername(user.username);

    return { user };
  } catch (error) {
    console.log(error);
  }

  if (!isUserAuth) {
    throw redirect(302, "/login");
  }
};

/**
 * Checks that the username is no longer than 12 or returns a shorter version
 * @param {*} name the original user name
 * @returns the new user name
 */
function truncateUsername(name) {
  const maxLength = 12;

  if (name.length <= maxLength) {
    return name;
  }

  const spaceIndex = name.indexOf(" ");
  if (spaceIndex !== -1 && spaceIndex <= maxLength) {
    return name.substring(0, spaceIndex);
  }

  return name.substring(0, 10) + "...";
}
