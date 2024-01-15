import axios from "axios";
import { redirect, fail } from "@sveltejs/kit";

/**
 * Fetches data from the habits microservice via the API gateway to retrieve a habit based on id
 * 
 * @param {*} params id for habit
 * @returns
 */
export const load = async ({ params, cookies }) => {
  try {
    const jwt = cookies.get("jwt");

    const response = await axios.get(`http://apigateway:3011/categories/${params.categoryId}/habits/${params.habitId}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const predefinedHabitsResponse = await axios.get("http://localhost:3011/predefined-habits", {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const predefinedHabitsObject = predefinedHabitsResponse.data.data;

    const predefinedHabits = predefinedHabitsObject.map(item => item.name);

    const category = params.categoryId;
    const habitData = response.data.data[0];

    const durationMinutes = Math.floor(habitData.duration / 60);
    const durationSeconds = habitData.duration - durationMinutes * 60;

    const habit = {
      id: habitData.id,
      name: habitData.name,
      start_time: habitData.start_time,
      duration: ((durationSeconds >= 0 && durationSeconds <= 9) ? `${durationMinutes}:0${durationSeconds}` : `${durationMinutes}:${durationSeconds}`)
    };

    return { habit, category, predefinedHabits };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, "/login");
    }
  }
};

export const actions = {
  editHabit: async ({ params, request, cookies }) => {
    const { categoryId, habitId } = params;
    try {
      // Retrieves the data from the form
      const formData = await request.formData();
      const jwt = cookies.get("jwt");
      
      const name = formData.get("name");
      const startTime = formData.get("start_time");
      const duration = formData.get("duration");
      const durationElements = duration.split(":");

      // check for errors in a form data
      const errors = await validateEditData(name, startTime, duration);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { name, startTime, duration, errors });
      }

      // Set the body of the request, adds a header and sends put request to update habit
      await axios.put(`http://apigateway:3011/categories/${categoryId}/habits/${habitId}`, {
        name: name,
        start_time: startTime,
        duration: parseInt(durationElements[0]) * 60 + parseInt(durationElements[1])
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

async function validateEditData(name, startTime, duration) {
  const errors = [];

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
    const durationElements = duration.split(":");
    if (!durationRegex.test(duration)) {
      errors.push({ "input": "duration", "message": "Duration should be of a format (m)m:(s)s" });
    } else if (parseInt(durationElements[0]) === 0 && parseInt(durationElements[1]) === 0) {
      errors.push({ "input": "duration", "message": "Duration should be more than zero" });
    }
  }

  return errors;
}
