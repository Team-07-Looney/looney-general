import axios from "axios";
import { redirect, fail } from '@sveltejs/kit';

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
    editHabit: async ({ params, request }) => {
          
      // Retrieves the data from the form
      const formData = await request.formData();
      const { id } = params;
      const name = formData.get('name');
      const startTime = formData.get('start_time');
      const duration = formData.get('duration');

      // check for errors in a form data
      const errors = await validateEditData(name, startTime, duration);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { name, startTime, duration, errors });
      }

      // Set the body of the request, adds a header and sends put request to update habit
      const data = await axios.put(`http://localhost:3011/habits/${id}`, {
        name: formData.get('name'),
        start_time: formData.get('start_time'),
        duration: parseInt(formData.get('duration'))
      }, {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      },)

      throw redirect(302, `/habits/${id}`);
    }
};

async function validateEditData(name, startTime, duration) {
  let errors = [];

  if (!name) {
    errors.push({ "input": "name", "message": "Name is missing" });
  }

  if (!startTime) {
    errors.push({ "input": "start_time", "message": "Start time is missing" });
  } else {
    const startTimeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!startTimeRegex.test(startTime)) {
      errors.push({ "input": "start_time", "message": "Start time should be of a format hh:mm" })
    }
  }

  if (!duration) {
    errors.push({ "input": "duration", "message": "Duration is missing" });
  }

  return errors;
}
