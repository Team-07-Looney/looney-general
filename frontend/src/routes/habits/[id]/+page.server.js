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

  export const actions = {
    deleteHabit: async ({ params, request }) => {
          
      // Retrieves the data from the form
      const formData = await request.formData();
      const { id } = params;

      // Set the body of the request, adds a header and sends post request to create habit
      const data = await axios.delete(`http://localhost:3011/habits/${id}`, {
        id: id
      }, {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      },)
    }
};