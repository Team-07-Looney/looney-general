import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

/**
 * Fetches data from the moods microservice via the API gateway to retrieve all moods
 *
 * @param {*} serverLoadEvent
 * @returns
 */

export const load = async ({ serverLoadEvent, cookies, params }) => {
  let isUserAuth = false;
  const { recordId } = params;
  try {
    const jwtoken = cookies.get('jwt');
    const payload = jwt.decode(jwtoken);

    const isAuthenticated = await axios.get('http://localhost:3011/verify', {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });

    const recordsResponse = await axios.get('http://localhost:3011/recordsMoods', {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });

    const moodsResponse = await axios.get('http://localhost:3011/moods', {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });


    const adviceResponse = await axios.get('http://localhost:3011/advice', {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });

    const adviceGroupsResponse = await axios.get('http://localhost:3011/advice-groups', {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });

    if (isAuthenticated.data.message == "User is authenticated") {
      isUserAuth = true;
    }
    const records = recordsResponse.data.data;
    const userId = payload.id;
    const moods = moodsResponse.data.data;
    const advice = adviceResponse.data.data;
    const adviceGroups = adviceGroupsResponse.data.data;
    const filteredRecordsByUser = records.filter(record => record.user_id === userId);
    const moodTypeCounts = {};
    let totalMoodTypes = 0;

    // Iterate over filteredRecordsByUser to create statistics
    filteredRecordsByUser.forEach((record) => {
      // Find the corresponding mood in the moodTable
      const mood = moods.find((mood) => mood.id === parseInt(record.mood_id.split('/').pop(), 10));
      totalMoodTypes += 1;
      // Check if mood is found
      if (mood) {
        const { mood_type_id } = mood;
        // Increment the count for the mood_type_id
        moodTypeCounts[mood_type_id] = (moodTypeCounts[mood_type_id] || 0) + 1;
      }
    });

    const moodType1 = '/mood-types/1';
    const moodType2 = '/mood-types/2';
    const moodType3 = '/mood-types/3';
    const positiveTotal = moodTypeCounts[moodType1] || 0;
    const neutralTotal = moodTypeCounts[moodType2] || 0;
    const negativeTotal = moodTypeCounts[moodType3] || 0;

    const statistics = {
      "positive": positiveTotal,
      "neutral": neutralTotal,
      "negative": negativeTotal,
      "total": totalMoodTypes
    };

    // Advice
    const selectedRecord = filteredRecordsByUser.find((record) => record.id === parseInt(recordId));
    const selectedMood = moods.find((mood) => mood.id === parseInt(selectedRecord.mood_id.split('/').pop(), 10));
    const selectedMoodType = parseInt(selectedMood.mood_type_id.split('/').pop(), 10)
    const filteredAdviceBySelectedMoodType = advice.filter(advice => advice.mood_type_id === selectedMoodType);

    // Function to pick two random pieces of advice
    function pickTwoRandomAdvice(array) {
      // Generate random pieces of advice
      const advice1 = Math.floor(Math.random() * array.length);
      let advice2 = Math.floor(Math.random() * array.length);

      // Make sure the second advice is different from the first
      while (advice2 === advice1) {
        advice2 = Math.floor(Math.random() * array.length);
      }

      // Return the two random pieces of advice
      return [array[advice1], array[advice2]];
    }

    // Call the function and get two random instances
    const randomAdvice = pickTwoRandomAdvice(filteredAdviceBySelectedMoodType);

    // To add the group name to the random pieces of advice
    const finalAdvice = randomAdvice.map(advice => ({
      ...advice,
      groupName: adviceGroups.find(group => group.id === advice.group_id)?.name || null
    }));

    return { statistics, recordId, finalAdvice, userId };
  } catch (error) {
    console.log(error);
  }
  // If they are authenticated they should not be able to access the login
  // Svelte issue with throwing redirect within a try-catch block workaround
  if (!isUserAuth) {
    throw redirect(302, "/login");
  }
};

/**
 * createAdviceRecord is a function called when the user submits a form to create a record
 */
export const actions = {
  createAdvice: async ({ request, cookies }) => {
    let recordId;
    try {
      const jwtoken = cookies.get('jwt');
      const payload = jwt.decode(jwtoken);

      // Retrieves the data from the form
      const formData = await request.formData();
      const adviceId = formData.get('adviceId');

      // check for errors in a form data
      const errors = await validateCreateData(adviceId);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { adviceId, errors });
      }
      console.log(adviceId);
      // Set the body of the request, adds a header and sends post request to create record
      const data = await axios.post('http://localhost:3011/recordsAdvice', {
        advice_id: adviceId,
        user_id: payload.id
      }, {
        headers: {
          "Authorization": `Bearer ${jwtoken}`,
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      });

      const responseRecords = await axios.get('http://localhost:3011/recordsAdvice', {
        headers: {
          'Authorization': `Bearer ${jwtoken}`
        }
      });

      const records = responseRecords.data.data;
      const lastrecordId = records.length;
      recordId = lastrecordId;
      console.log(responseRecords);

    } catch (error) {
      if (error.response.status == 401) {
        throw redirect(302, '/login');
      }
    }

    throw redirect(302, `/moods`);
  }
};

async function validateCreateData(advice_id) {
  let errors = [];
  return errors;
}