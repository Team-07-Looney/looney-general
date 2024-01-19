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
    const { categoryId, habitId } = params;

    const response = await axios.get(`http://apigateway:3011/categories/${categoryId}/habits/${habitId}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const habit = response.data.data;

    return { habit };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, "/login");
    }
  }
};

export const actions = {
  deleteHabit: async ({ params, cookies, request }) => {
    const { categoryId } = params;
    try {
      // Retrieves the id from the url
      const jwt = cookies.get("jwt");
      const formData = await request.formData();
      const habit = formData.get("habit_id");

      // Set the body of the request, adds a header and sends delete request to delete habit
      await axios.delete(`http://apigateway:3011/categories/${categoryId}/habits/${habit}`, {
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

    throw redirect(302, `/categories/${categoryId}/habits`);
  },

  createRecord: async ({ cookies, params }) => {
    const { categoryId, habitId } = params;
    try {
      const jwt = cookies.get("jwt");

      // Set the body of the request, adds a header and sends post request to create record
      await axios.post("http://apigateway:3011/habit-records", {
        habit_id: habitId
      }, {
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

    throw redirect(302, `/categories/${categoryId}/habits`);
  }
};
