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

    const filteredThoughtsByUser = thoughts.filter(thought => thought.user_id === userId);

    return { filteredThoughtsByUser, thoughtsDate };
  } catch (error) {
    console.log(error);
     if (error.response.status == 401) {
       throw redirect(302, '/login');
     }
  }
};
