import { redirect } from '@sveltejs/kit';
import axios from 'axios';

/**
 * Fetches data from the moods microservice via the API gateway to retrieve a thought based on id
 * 
 * @param {*} params id for thought
 * @returns
 */
export const load = async ({ params, cookies }) => {
  try {
    const jwt = cookies.get('jwt');
    const { thoughtsId } = params;

    const response = await axios.get(`http://localhost:3011/thoughts/${thoughtsId}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const thoughts = response.data.data;
    const thoughtsDate = response.data.meta.date;
    return { thoughts, thoughtsDate };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, '/login');
    }
  }
};

export const actions = {
    deleteThought: async ({ params, cookies }) => {
      const { thoughtsId } = params;
      try {
        const jwt = cookies.get('jwt');
        const data = await axios.delete(`http://localhost:3011/thoughts/${thoughtsId}`, {
          headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": 'application/x-www-form-urlencoded'
          }
        });
      } catch (error) {
        if (error.response.status == 401) {
          throw redirect(302, '/login');
        }
      }
      throw redirect(302, `/moods/thoughts`);
    }
  };
  