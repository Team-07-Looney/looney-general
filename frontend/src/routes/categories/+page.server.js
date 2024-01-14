import { redirect } from "@sveltejs/kit";
import axios from "axios";
import jwt from "jsonwebtoken";

/**
 * Fetches data from the habits microservice via the API gateway to retrieve all habits
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ cookies }) => {
  try {
    const jwtToken = cookies.get("jwt");
    const payload = jwt.decode(jwtToken);

    const response = await axios.get("http://apigateway:3011/categories", {
      headers: {
        "Authorization": `Bearer ${jwtToken}`
      }
    });

    const categories = response.data.data;
    const userId = payload.id;

    const filteredCategoriesByUser = categories.filter(category => category.user_id === userId);

    return { filteredCategoriesByUser };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, "/login");
    }
  }
};
