import { redirect } from '@sveltejs/kit';
import axios from 'axios';

/**
 * Fetches data from the habits microservice via the API gateway to retrieve all categories
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ serverLoadEvent, cookies, params }) => {
  try {
    const jwt = cookies.get('jwt');
    const { categoryId } = params;

    const responseRecords = await axios.get(`http://localhost:3011/records`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const responseCategory = await axios.get(`http://localhost:3011/categories/${categoryId}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const responseHabits = await axios.get(`http://localhost:3011/categories/${categoryId}/habits`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    const habits = responseHabits.data.data;
    const category = responseCategory.data.data;
    const records = responseRecords.data.data;

    habits.forEach(habit => {
      records.forEach(record => {
        if (habit.id === record.habit_id && record.date === responseHabits.data.meta.date) {
          habit.done = true;
        }
      })

      if (!habit.done) {
        habit.done = false;
      }
    });

    return { habits, category };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, '/login');
    }
  }
};