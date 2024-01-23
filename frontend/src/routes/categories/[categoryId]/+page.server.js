import axios from "axios";
import { redirect } from "@sveltejs/kit";

/**
 * Fetches data from the habits microservice via the API gateway to retrieve a habit based on id
 * 
 * @param {*} params id for habit
 * @returns
 */
export const load = async ({ params, cookies }) => {
  try {
    const jwt = cookies.get("jwt");

    const { categoryId } = params;
    const response = await axios.get(`http://apigateway:3011/categories/${categoryId}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const categories = response.data.data;
    return { categories };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, "/login");
    }
  }
};

export const actions = {
  deleteCategory: async ({ request, cookies }) => {
    try {
      // Retrieves the id from the url
      const jwt = cookies.get("jwt");
      const formData = await request.formData();
      const category = formData.get("category_id");

      // Set the body of the request, adds a header and sends delete request to delete habit
      await axios.delete(`http://apigateway:3011/categories/${category}`, {
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/x-www-form-urlencoded" // The header is important!
        }
      });

    } catch (error) {
      if (error.response.status == 401) {
        throw redirect(302, "/login");
      }
    }

    throw redirect(302, "/categories");
  }
};
