import axios from "axios";
import { fail, redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

export const actions = {
  createMood: async ({ request, cookies }) => {

    try {
      const jwtToken = cookies.get("jwt");
      const payload = jwt.decode(jwtToken);

      // Retrieves the data from the form
      const formData = await request.formData();
      const name = formData.get("name");
      const moodTypeId = formData.get("mood_type_id");

      // check for errors in a form data
      const errors = await validateCreateData(name, moodTypeId);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { name, mood_type_id: moodTypeId, errors });
      }

      // Set the body of the request, adds a header and sends post request to create record
      await axios.post("http://apigateway:3011/moods", {
        name: name,
        mood_type_id: moodTypeId,
        user_id: payload.id
      }, {
        headers: {
          "Authorization": `Bearer ${jwtToken}`,
          "Content-Type": "application/x-www-form-urlencoded" // The header is important!
        }
      });
    } catch (error) {
      if (error.response.status == 401) {
        throw redirect(302, "/login");
      }
    }

    throw redirect(302, "/moods/my-mood");
  }
};

async function validateCreateData(name, moodTypeId) {
  const errors = [];
  if (!name) {
    errors.push({ "input": "name", "message": "Name is missing" });
  }
  if (!moodTypeId) {
    errors.push({ "input": "mood_type_id", "message": "Select a mood type" });
  }
  return errors;
}
