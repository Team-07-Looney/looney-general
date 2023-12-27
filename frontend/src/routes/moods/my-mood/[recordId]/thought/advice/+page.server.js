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

    const modsResponse = await axios.get('http://localhost:3011/moods', {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });

    if (isAuthenticated.data.message == "User is authenticated") {
        isUserAuth = true;
      }
      const records = recordsResponse.data.data;
      const userId = payload.id;
      const moods = modsResponse.data.data;

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

      return { statistics, recordId};
    } catch (error) {
      console.log(error);
    }
  
  
    // If they are authenticated they should not be able to access the login
    // Svelte issue with throwing redirect within a try-catch block workaround
    if (!isUserAuth) {
      throw redirect(302, "/login");
    }
  };
  
