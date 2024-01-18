import { redirect } from "@sveltejs/kit";
import axios from "axios";
import jwt from "jsonwebtoken";

/**
 * Fetches data from the moods microservice via the API gateway to retrieve all moods
 * 
 * @param {*} serverLoadEvent 
 * @returns
 */

export const load = async ({ cookies }) => {
  let isUserAuth = false;
  try {
    const jwtoken = cookies.get("jwt");
    const payload = jwt.decode(jwtoken);

    const isAuthenticated = await axios.get("http://apigateway:3011/verify", {
      headers: {
        "Authorization": `Bearer ${jwtoken}`
      }
    });

    const recordsResponse = await axios.get("http://apigateway:3011/mood-records", {
      headers: {
        "Authorization": `Bearer ${jwtoken}`
      }
    });

    const moodsResponse = await axios.get("http://apigateway:3011/moods", {
      headers: {
        "Authorization": `Bearer ${jwtoken}`
      }
    });

    const thoughtsResponse = await axios.get("http://apigateway:3011/thoughts", {
      headers: {
        "Authorization": `Bearer ${jwtoken}`
      }
    });

    const reasonsResponse = await axios.get("http://apigateway:3011/reasons", {
      headers: {
        "Authorization": `Bearer ${jwtoken}`
      }
    });

    const adviceRecordsResponse = await axios.get("http://apigateway:3011/advice-records", {
      headers: {
        "Authorization": `Bearer ${jwtoken}`
      }
    });

    const adviceResponse = await axios.get("http://apigateway:3011/advice", {
      headers: {
        "Authorization": `Bearer ${jwtoken}`
      }
    });

    const groupsResponse = await axios.get("http://apigateway:3011/advice-groups", {
      headers: {
        "Authorization": `Bearer ${jwtoken}`
      }
    });

    if (isAuthenticated.data.message == "User is authenticated") {
      isUserAuth = true;
    }
    const userId = payload.id;
    const records = recordsResponse.data.data;
    const moods = moodsResponse.data.data;
    const thoughts = thoughtsResponse.data.data;
    const reasons = reasonsResponse.data.data;
    const adviceRecords = adviceRecordsResponse.data.data;
    const advice = adviceResponse.data.data;
    const groups = groupsResponse.data.data;
    const filteredRecordsByUser = records.filter(record => record.user_id === userId);
    const filteredAdviceRecordsByUser = adviceRecords.filter(
      adviceRecord => adviceRecord.user_id === userId);
    const moodTypeCounts = {};
    let totalMoodTypes = 0;
    const adviceCounts = {};
    const adviceDetails = {};
    const moodType1 = "/mood-types/1";
    const moodType2 = "/mood-types/2";
    const moodType3 = "/mood-types/3";
    // Calculates the total thoughts written for the specific user
    const totalThoughts = thoughts.filter((thought) => {
      const record = filteredRecordsByUser.find((r) => r.id === parseInt(thought.record_id.split("/").pop(), 10));
      return record !== undefined;
    }).length;

    // Calculates the overall mood statistics
    filteredRecordsByUser.forEach((record) => {
      // Find the corresponding mood in the moodTable
      const mood = moods.find((m) => m.id === parseInt(record.mood_id.split("/").pop(), 10));
      totalMoodTypes += 1;
      // Check if mood is found
      if (mood) {
        const { mood_type_id: moodTypeId } = mood;
        // Increment the count for the moodTypeId
        moodTypeCounts[moodTypeId] = (moodTypeCounts[moodTypeId] || 0) + 1;
      }
    });

    filteredAdviceRecordsByUser.forEach((record) => {
      const advice1 = advice.find((m) => m.id === parseInt(record.advice_id));
      
      if (advice1) {
        adviceCounts[advice1.id] = (adviceCounts[advice1.id] || 0) + 1;
      
        // Find the corresponding group
        const group = groups.find((g) => g.id === advice1.group_id);
      
        // Store additional details
        adviceDetails[advice1.id] = {
          name: advice1.name,
          group: group || { id: 0, name: "Unknown" } // Use 'Unknown' if the group is not found
        };
      }
    });
      
    // Convert adviceCounts to an array of objects for easier sorting
    const adviceCountsArray = Object.entries(adviceCounts).map(([id, count]) => ({
      id: parseInt(id),
      count: count,
      name: adviceDetails[id].name,
      group_name: adviceDetails[id].group.name
    }));
      
    // Sort the array by count in descending order
    const mostFrequentAdvice = adviceCountsArray.sort((a, b) => b.count - a.count).slice(0, 2);
      
    const positiveTotal = moodTypeCounts[moodType1] || 0;
    const neutralTotal = moodTypeCounts[moodType2] || 0;
    const negativeTotal = moodTypeCounts[moodType3] || 0;

    const statistics = {
      "positive": positiveTotal,
      "neutral": neutralTotal,
      "negative": negativeTotal,
      "total": totalMoodTypes
    };
    findMostRecordedReason(records, reasons);
          
    // Calls the function to find the most recorded reason and saves it in a variable
    const mostRecordedReasonName = findMostRecordedReason(filteredRecordsByUser, reasons);
    return { statistics, totalThoughts, mostRecordedReasonName, mostFrequentAdvice};
  } catch (error) {
    console.log(error);
  }
  
  // Find the most recorded reason in the records and return its name
  function findMostRecordedReason(records, reasons) {
    // Create an object to store the count of each reason_id
    const reasonCounts = {};
    
    // Iterate over filteredRecordsByUser
    records.forEach((record) => {
      const reasonId = parseInt(record.reason_id.split("/").pop(), 10);
    
      // Increment the count for the reason_id
      reasonCounts[reasonId] = (reasonCounts[reasonId] || 0) + 1;
    });
    
    // Find the reason_id with the maximum count
    const mostRecordedReasonId = Object.keys(reasonCounts).reduce((maxReason, reason) => {
      return reasonCounts[reason] > reasonCounts[maxReason] ? reason : maxReason;
    }, Object.keys(reasonCounts)[0]);
    
    // Find the reason object in reasons Table
    const mostRecordedReason = reasons.find(
      (reason) => reason.id === parseInt(mostRecordedReasonId, 10));
    return mostRecordedReason ? mostRecordedReason.name : null;
  }
  
  // If they are authenticated they should not be able to access the login
  // Svelte issue with throwing redirect within a try-catch block workaround
  if (!isUserAuth) {
    throw redirect(302, "/login");
  }
};
  
