import { redirect } from "@sveltejs/kit";
import axios from "axios";
import jwt from "jsonwebtoken";

export const ssr = false;

/**
 * Fetches data from the moods microservice via the API gateway to retrieve all locations
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ cookies }) => {
  try {
    const jwtoken = cookies.get("jwt");
    const payload = jwt.decode(jwtoken);

    const response = await axios.get("http://localhost:3011/latest-thoughts", {
      headers: {
        "Authorization": `Bearer ${jwtoken}`
      }
    });

    const thoughts = response.data.data;
    const userId = payload.id;
    thoughts.forEach((thought) => {
      const location = thought.location.split(",");
      thought.location = location.map(Number);
    });

    const userThought = thoughts.find(thought => thought.user_id === userId);
    const userLocation = userThought.location;

    return { thoughts, userLocation };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, "/login");
    }
  }
};
