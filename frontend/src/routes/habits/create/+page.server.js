import axios from 'axios';
import { fail, redirect } from '@sveltejs/kit';

/**
 * createHabit is a function called when the user submits a form to create a habit
 */
export const actions = {
  createHabit: async ({ request }) => {

    // Retrieves the data from the form
    const formData = await request.formData();
    const name = formData.get('name');
    const startTimeHours = formData.get('start_time_hours');
    const startTimeMinutes = formData.get('start_time_minutes');
    const durationMinutes = formData.get('duration_minutes');
    const durationSeconds = formData.get('duration_seconds');

    // check for errors in a form data
    const errors = await validateCreateData(name, startTimeHours, startTimeMinutes, durationMinutes, durationSeconds);

    //if there are any errors, return form with error messages
    if (errors.length > 0) {
      return fail(400, { name, startTimeHours, startTimeMinutes, durationMinutes, durationSeconds, errors });
    }

    // Set the body of the request, adds a header and sends post request to create habit
    const data = await axios.post('http://localhost:3011/habits', {
      name: name,
      start_time: `${startTimeHours}:${startTimeMinutes}`,
      duration: parseInt(durationMinutes) * 60 + parseInt(durationSeconds)
    }, {
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
      }
    });

    throw redirect(302, '/habits');
  }
};

async function validateCreateData(name, startTimeHours, startTimeMinutes, durationMinutes, durationSeconds) {
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