import axios from "axios";
import { redirect, fail } from '@sveltejs/kit';

/**
 * Fetches data from the habits microservice via the API gateway to retrieve a habit based on id
 * 
 * @param {*} params id for habit
 * @returns
 */
export const load = async ({ params, cookies }) => {
  try {
    const jwt = cookies.get('jwt');

    const { id } = params;
    const response = await axios.get(`http://localhost:3011/habits/${id}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });
    const habitData = response.data.data[0];

    const start_time = habitData.start_time.split(':');
    const duration_minutes = Math.floor(habitData.duration / 60);
    const duration_seconds = habitData.duration - duration_minutes * 60;

    const habit = {
      id: habitData.id,
      name: habitData.name,
      start_time_hours: start_time[0],
      start_time_minutes: start_time[1],
      duration_minutes: duration_minutes,
      duration_seconds: ((duration_seconds >= 0 && duration_seconds <= 9) ? `0${duration_seconds}` : duration_seconds)
    };

    return habit;
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, '/login');
    }
  }
};

export const actions = {
  editHabit: async ({ params, request, cookies }) => {
    try {
      // Retrieves the data from the form
      const formData = await request.formData();
      const jwt = cookies.get('jwt');
      const { id } = params;
      const name = formData.get('name');
      const startTimeHours = formData.get('start_time_hours');
      const startTimeMinutes = formData.get('start_time_minutes');
      const durationMinutes = formData.get('duration_minutes');
      const durationSeconds = formData.get('duration_seconds');

      // check for errors in a form data
      const errors = await validateEditData(name, startTimeHours, startTimeMinutes, durationMinutes, durationSeconds);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { name, startTimeHours, startTimeMinutes, durationMinutes, durationSeconds, errors });
      }

      // Set the body of the request, adds a header and sends put request to update habit
      const data = await axios.put(`http://localhost:3011/habits/${id}`, {
        name: name,
        start_time: `${startTimeHours}:${startTimeMinutes}`,
        duration: parseInt(durationMinutes) * 60 + parseInt(durationSeconds)
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

    throw redirect(302, `/habits`);
  }
};

async function validateEditData(name, startTimeHours, startTimeMinutes, durationMinutes, durationSeconds) {
  let errors = [];

  //check if name exists
  if (!name) {
    errors.push({ "input": "name", "message": "Name is missing" });
  }

  //check if start time hours exists
  if (!startTimeHours) {
    errors.push({ "input": "start_time_hours", "message": "Start time hours is missing" });
  } else {
    //if it exists, check for invalid input
    const startTimeHoursRegex = /^(?:[01]\d|2[0-3])$/;
    if (!startTimeHoursRegex.test(startTimeHours)) {
      errors.push({ "input": "start_time_hours", "message": "Start time hours should be of a format hh" })
    }
  }

  //check if start time minutes exists
  if (!startTimeMinutes) {
    errors.push({ "input": "start_time_minutes", "message": "Start time minutes is missing" });
  } else {
    //if it exists, check for invalid input
    const startTimeMinutesRegex = /^[0-5][0-9]$/;
    if (!startTimeMinutesRegex.test(startTimeMinutes)) {
      errors.push({ "input": "start_time_minutes", "message": "Start time minutes should be of a format mm" });
    }
  }

  //check if duration minutes exists
  if (!durationMinutes) {
    errors.push({ "input": "duration_minutes", "message": "Duration minutes is missing" });
  } else {
    //if it exists, check for invalid input
    const durationMinutesRegex = /^([0-9][0-9]|[0-9])$/;
    if (!durationMinutesRegex.test(durationMinutes)) {
      errors.push({ "input": "duration_minutes", "message": "Duration minutes should be of a format mm" });
    }
  }

  //check if duration seconds exists
  if (!durationSeconds) {
    errors.push({ "input": "duration_seconds", "message": "Duration seconds is missing" });
  } else {
    //if it exists, check for invalid input
    const durationSecondsRegex = /^([0-5][0-9])$/;
    if (!durationSecondsRegex.test(durationSeconds)) {
      errors.push({ "input": "duration_seconds", "message": "Duration seconds should be of a format ss" });
    }
  }

  return errors;
}