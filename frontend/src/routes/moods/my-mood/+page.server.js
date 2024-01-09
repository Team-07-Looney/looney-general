import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

/**
 * Fetches data from the moods microservice via the API gateway to retrieve all moods
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ serverLoadEvent, cookies }) => {
  try {
    const jwtoken = cookies.get('jwt');
    const payload = jwt.decode(jwtoken);
    const response1 = await axios.get('http://localhost:3011/moods', {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });

    const response2 = await axios.get('http://localhost:3011/reasons', {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });

    const moods = response1.data.data;
    const reasons = response2.data.data;
    const userId = payload.id;
    return { moods, reasons, userId};
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
      const jwtoken = cookies.get('jwt');
      const payload = jwt.decode(jwtoken);

      // Retrieves the data from the form
      const formData = await request.formData();
      const moodId = formData.get('moodId');
      const reasonId = formData.get('reasonId');


      // check for errors in a form data
      const errors = await validateCreateData(moodId, reasonId);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { moodId, reasonId, errors });
      }

      // Set the body of the request, adds a header and sends post request to create record
      const data = await axios.post('http://localhost:3011/recordsMoods', {
        mood_id: moodId,
        reason_id: reasonId,
        user_id: payload.id
      }, {
        headers: {
          "Authorization": `Bearer ${jwtoken}`,
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      });

      const responseRecords = await axios.get('http://localhost:3011/recordsMoods', {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });

      const records = responseRecords.data.data;
      const lastRecordId = records.length;
      recordId = lastRecordId;
      
    } catch (error) {
      if (error.response.status == 401) {
        throw redirect(302, '/login');
      }
    }

    throw redirect(302, `/moods/my-mood/${recordId}/thought`);
  }
};

async function validateCreateData(mood_id, reason_id) {
  let errors = [];
  return errors;
}