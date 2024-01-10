import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import jwt from 'jsonwebtoken';


/**
 * Fetches data from the moods microservice via the API gateway to retrieve all thoughts
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ serverLoadEvent, cookies }) => {
  try {
    const jwtoken = cookies.get('jwt');
    const payload = jwt.decode(jwtoken);

    const response = await axios.get('http://localhost:3011/thoughts', {
      headers: {
        'Authorization': `Bearer ${jwtoken}`
      }
    });

    const userId = payload.id;
    const thoughts = response.data.data;
    const thoughtsDate = response.data.meta.date;
    const records = [];
    const moods = [];
    const moodType = [];
    const filteredThoughtsByUser = thoughts.filter(thought => thought.user_id === userId);

    for (let i = 0; i < filteredThoughtsByUser.length; i++) {

      const recordResponse = await axios.get(`http://localhost:3011${filteredThoughtsByUser[i].record_id}`, {
        headers: {
          'Authorization': `Bearer ${jwtoken}`
        }
      });

      records.push(recordResponse.data.data[0]);

      const moodResponse = await axios.get(`http://localhost:3011${records[i].mood_id}`, {
        headers: {
          'Authorization': `Bearer ${jwtoken}`
        }
      });

      moods.push(moodResponse.data.data[0]);

      const moodTypeResponse = await axios.get(`http://localhost:3011${moods[i].mood_type_id}`, {
        headers: {
          'Authorization': `Bearer ${jwtoken}`
        }
      });

      moodType.push(moodTypeResponse.data.data[0].name);
    }

    return { filteredThoughtsByUser, thoughtsDate, records, moods, moodType };
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      throw redirect(302, '/login');
    }
  }
};
