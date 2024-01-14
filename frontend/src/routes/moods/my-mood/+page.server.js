import { redirect, fail } from "@sveltejs/kit";
import axios from "axios";
import jwt from "jsonwebtoken";

/**
 * Fetches data from the moods microservice via the API gateway to retrieve all moods
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ cookies }) => {
  try {
    const jwtToken = cookies.get("jwt");
    const payload = jwt.decode(jwtToken);
    const moodsResponse = await axios.get("http://apigateway:3011/moods", {
      headers: {
        "Authorization": `Bearer ${jwtToken}`
      }
    });

    const reasonsResponse = await axios.get("http://apigateway:3011/reasons", {
      headers: {
        "Authorization": `Bearer ${jwtToken}`
      }
    });

    const moods = moodsResponse.data.data;
    const reasons = reasonsResponse.data.data;
    const userId = payload.id;
    return { moods, reasons, userId };
  } catch (error) {
    console.log(error);
  }
};

/**
 * createRecord is a function called when the user submits a form to create a record
 */
export const actions = {
  createRecord: async ({ request, cookies }) => {
    let recordId;
    try {
      const jwt = cookies.get("jwt");

      // Retrieves the data from the form
      const formData = await request.formData();
      const moodId = formData.get("moodId");
      const reasonId = formData.get("reasonId");

      // check for errors in a form data
      const errors = [];
      // const errors = await validateCreateData(moodId, reasonId);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { moodId, reasonId, errors });
      }

      // Set the body of the request, adds a header and sends post request to create record
      await axios.post("http://apigateway:3011/recordsMoods", {
        mood_id: moodId,
        reason_id: reasonId,
      }, {
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/x-www-form-urlencoded" // The header is important!
        }
      });

      const responseRecords = await axios.get("http://apigateway:3011/recordsMoods", {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });

      const records = responseRecords.data.data;
      const lastRecordId = records.length;
      recordId = lastRecordId;

    } catch (error) {
      if (error.response.status == 401) {
        throw redirect(302, "/login");
      }
    }

    throw redirect(302, `/moods/my-mood/${recordId}/thought`);
  }
};

// TODO: Whoever implemented it - fix it
// async function validateCreateData(mood_id, reason_id) {
//   let errors = [];
//   return errors;
// }
