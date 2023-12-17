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
    const records = [];
    const moods = [];
    const moodType = [];


    for(let i = 0; i < thoughts.length; i++) {

      const recordResponse = await axios.get(`http://localhost:3011${thoughts[i].record_id}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });

      records.push(recordResponse.data.data[0]);
  
      const moodResponse = await axios.get(`http://localhost:3011${records[i].mood_id}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });

      moods.push(moodResponse.data.data[0]);
  
      const moodTypeResponse = await axios.get(`http://localhost:3011${moods[i].mood_type_id}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });

      moodType.push(moodTypeResponse.data.data[0].name);
    }

    return { thoughts, thoughtsDate, records, moods, moodType};
  } catch (error) {
    console.log(error);
     if (error.response.status == 401) {
       throw redirect(302, '/login');
     }
  }
};
