import { redirect } from "@sveltejs/kit";
import axios from "axios";

/**
 * Fetches data from the habits microservice via the API gateway to retrieve all habits
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */
export const load = async ({ cookies, params }) => {
  try {
    const jwt = cookies.get("jwt");
    const { categoryId } = params;

    const responseRecords = await axios.get("http://apigateway:3011/habit-records", {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const responseCategory = await axios.get(`http://apigateway:3011/categories/${categoryId}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const responseHabits = await axios.get(`http://apigateway:3011/categories/${categoryId}/habits`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const habits = responseHabits.data.data;
    const category = responseCategory.data.data;
    console.log(category);
    const records = responseRecords.data.data;
    const filteredHabitsByCategory = habits.filter(habit => habit.category_id === category[0].id);

    filteredHabitsByCategory.sort((a,b) => {
      const startTimeA = a.start_time;
      const startTimeB = b.start_time;

      if (startTimeA < startTimeB) {
        return -1;
      }
      if (startTimeA > startTimeB) {
        return 1;
      }
      return 0;
    });

    filteredHabitsByCategory.forEach(habit => {
      records.forEach(record => {
        if (habit.id === record.habit_id && record.date === responseHabits.data.meta.date) {
          habit.done = true;
        }
      });

      if (!habit.done) {
        habit.done = false;
      }
    });

    return { category, filteredHabitsByCategory };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, "/login");
    }
  }
};
