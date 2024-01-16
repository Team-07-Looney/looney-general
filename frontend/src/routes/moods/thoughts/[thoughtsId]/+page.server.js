import { redirect } from "@sveltejs/kit";
import axios from "axios";

/**
 * Fetches data from the moods microservice via the API gateway to retrieve a thought based on id
 * 
 * @param {*} params id for thought
 * @returns
 */
export const load = async ({ params, cookies }) => {
  try {
    const jwt = cookies.get("jwt");
    const { thoughtsId } = params;

    const response = await axios.get(`http://apigateway:3011/thoughts/${thoughtsId}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const thoughts = response.data.data;
    const thoughtsDate = response.data.meta.date;

    
    const responseRecords = await axios.get(`http://apigateway:3011/mood-records/${thoughts[0].record_id}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const records = responseRecords.data.data;

    const responseMoods = await axios.get(`http://apigateway:3011${records[0].mood_id}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const moods = responseMoods.data.data;

    const responseMoodType = await axios.get(`http://apigateway:3011${moods[0].mood_type_id}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    const moodType = responseMoodType.data.data[0].name;

    return { thoughts, thoughtsDate, records, moods, moodType };
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, "/login");
    }
  }
};

export const actions = {
  deleteThought: async ({ params, cookies }) => {
    const { thoughtsId } = params;
    try {
      const jwt = cookies.get("jwt");

      await axios.delete(`http://apigateway:3011/thoughts/${thoughtsId}`, {
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
    } catch (error) {
      if (error.response.status == 401) {
        throw redirect(302, "/login");
      }
    }
    throw redirect(302, "/moods/thoughts");
  }
};
