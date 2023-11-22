import axios from 'axios';

/**
 * Fetches data from the habits microservice via the API gateway to retrieve all habits
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async (serverLoadEvent) => {
  try {
    const response = await axios.get('http://localhost:3011/habits');
    const habits = response.data.data;
    return { habits };
  } catch (error) {
    console.error(error);
  }
};