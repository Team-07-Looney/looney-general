import { redirect } from '@sveltejs/kit';
import axios from 'axios';

/**
 * Fetches data from the moods microservice via the API gateway to retrieve all thoughts
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ serverLoadEvent, cookies }) => {
  try {
    const jwt = cookies.get('jwt');

    const response = await axios.get('http://localhost:3011/thoughts', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const thoughts = response.data.data;
    const thoughtsDate = response.data.meta.date;

    
    const recordResponse = await axios.get(`http://localhost:3011${thoughts[0].record_id}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const records = recordResponse.data.data;

    const moodResponse = await axios.get(`http://localhost:3011${records[0].mood_id}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const moods = moodResponse.data.data;

    const moodTypeResponse = await axios.get(`http://localhost:3011${moods[0].mood_type_id}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const moodType = moodTypeResponse.data.data[0].name;

    return { thoughts, thoughtsDate, records, moods, moodType};
  } catch (error) {
    console.log(error);
     if (error.response.status == 401) {
       throw redirect(302, '/login');
     }
  }
};
