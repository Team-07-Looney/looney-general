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

    if (isAuthenticated.data.message == "User is authenticated") {
      isUserAuth = true;
    }
    const records = recordsResponse.data.data;
    const userId = payload.id;
    const moods = moodsResponse.data.data;
    const advice = adviceResponse.data.data;
    const filteredRecordsByUser = records.filter(record => record.user_id === userId);
    const moodTypeCounts = {};
    let totalMoodTypes = 0;

    // Iterate over filteredRecordsByUser
    filteredRecordsByUser.forEach((record) => {
      // Find the corresponding mood in the moodTable
      const mood = moods.find((m) => m.id === parseInt(record.mood_id.split('/').pop(), 10));
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

    const selectedRecord = filteredRecordsByUser.find((record) => record.id === parseInt(recordId));
    const selectedMood = moods.find((mood) => mood.id === parseInt(selectedRecord.mood_id.split('/').pop(), 10));
    console.log(selectedMood);
  
    // const filteredAdviceBySelectedMoodType = advice.filter(advice => advice.mood_type_id === selectedMoodType);
    // // Function to pick two random pieces of advice
    // function pickTwoRandomAdvice(array) {
    //   // Generate random pieces of advice
    //   const advice1 = Math.floor(Math.random() * array.length);
    //   let advice2 = Math.floor(Math.random() * array.length);

    //   // Make sure the second advice is different from the first
    //   while (advice2 === advice1) {
    //     advice2 = Math.floor(Math.random() * array.length);
    //   }

    //   // Return the two random pieces of advice
    //   return [array[advice1], array[advice2]];
    // }

    // // Call the function and get two random instances
    // const randomInstances = pickTwoRandomAdvice(filteredAdviceBySelectedMoodType);
    // // console.log(randomInstances);
    return { statistics, recordId };
  } catch (error) {
    console.log(error);
  }


  // If they are authenticated they should not be able to access the login
  // Svelte issue with throwing redirect within a try-catch block workaround
  if (!isUserAuth) {
    throw redirect(302, "/login");
  }
};

