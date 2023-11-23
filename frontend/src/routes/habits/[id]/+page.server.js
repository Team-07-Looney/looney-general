import axios from "axios";

/**
 * Fetches data from the habits microservice via the API gateway to retrieve a habit based on id
 * 
 * @param {*} params id for habit
 * @returns
 */
export const load = async ({ params }) => {
    try {
      const { id } = params;
      const response = await axios.get(`http://localhost:3011/habits/${id}`);
      const habit = response.data.data;
      return { habit };
    } catch (error) {
      console.error(error);
    }
  };