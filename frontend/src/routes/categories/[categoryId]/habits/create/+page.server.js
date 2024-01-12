import axios from 'axios';
import { fail, redirect } from '@sveltejs/kit';

/**
 * Executes during the load of the svelte page
 * @param {*} param0
*/
export const load = async ({ cookies, params }) => {
  try {
    // Get the cookie containing the JWT token
    const jwt = cookies.get('jwt');
    const { categoryId } = params;

    const predefinedHabitsResponse = await axios.get('http://localhost:3011/predefined-habits', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const predefinedHabitsObject = predefinedHabitsResponse.data.data;

    const predefinedHabits = predefinedHabitsObject.map(item => item.name);

    return { categoryId, predefinedHabits };
  } catch (error) {
    if (error.response.status == 401)  {
      throw redirect(302, '/login');
    }
  }
};

/**
 * createHabit is a function called when the user submits a form to create a habit
 */
export const actions = {
  createHabit: async ({ request, cookies, params }) => {

    const { categoryId } = params

    try {
      const jwt = cookies.get('jwt');

      // Retrieves the data from the form
      const formData = await request.formData();
      const name = formData.get('name');
      const startTime = formData.get('start_time');
      const duration = formData.get('duration');
      const durationElements = duration.split(':');

      // check for errors in a form data
      const errors = await validateCreateData(name, startTime, duration);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { name, startTime, duration, errors });
      }

      // Set the body of the request, adds a header and sends post request to create habit
      const data = await axios.post(`http://localhost:3011/categories/${categoryId}/habits`, {
        name: name,
        start_time: startTime,
        duration: parseInt(durationElements[0]) * 60 + parseInt(durationElements[1]),
        category_id: categoryId
      }, {
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      });
    } catch (error) {
      if (error.response.status == 401) {
        throw redirect(302, '/login');
      }
    }

    throw redirect(302, `/categories/${categoryId}/habits`);
  }
};

async function validateCreateData(name, startTime, duration) {
  let errors = [];

  //check if name exists
  if (!name) {
    errors.push({ "input": "name", "message": "Name is missing" });
  } else {
    //if it exists, check if it contains only english letters
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      errors.push({ "input": "name", "message": "Name should contain only English letters" });
    }
  }

  //check if start time exists
  if (!startTime) {
    errors.push({ "input": "start_time", "message": "Start time is missing" });
  } else {
    //if it exists, check for invalid input
    const startTimeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!startTimeRegex.test(startTime)) {
      errors.push({ "input": "start_time", "message": "Start time should be of a format hh:mm" });
    }
  }

  //check if duration exists
  if (!duration) {
    errors.push({ "input": "duration", "message": "Duration is missing" });
  } else {
    //if it exists, check for invalid input
    const durationRegex = /^([0-8]?[0-9]|90):([0-5]?[0-9]|60)$/;
    const durationElements = duration.split(':');
    if (!durationRegex.test(duration)) {
      errors.push({ "input": "duration", "message": "Duration should be of a format (m)m:(s)s" });
    } else if (parseInt(durationElements[0]) === 0 && parseInt(durationElements[1]) === 0) {
      errors.push({ "input": "duration", "message": "Duration should be more than zero" });
    }
  }

  return errors;
}
