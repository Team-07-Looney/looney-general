import axios from "axios";
import { redirect, fail } from '@sveltejs/kit';

/**
 * Fetches data from the habits microservice via the API gateway to retrieve a habit based on id
 * 
 * @param {*} params id for habit
 * @returns
 */
export const load = async ({ params, cookies }) => {
  try {
    const jwt = cookies.get('jwt');

    const { id } = params;
    const response = await axios.get(`http://localhost:3011/categories/${id}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });
    const categoryData = response.data.data[0];

    const category = {
      id: categoryData.id,
      name: categoryData.name
    };

    return category;
  } catch (error) {
    if (error.response.status == 401) {
      throw redirect(302, '/login');
    }
  }
};

export const actions = {
  editCategory: async ({ params, request, cookies }) => {
    try {
      // Retrieves the data from the form
      const formData = await request.formData();
      const jwt = cookies.get('jwt');
      const { id } = params;
      const name = formData.get('name');

      // check for errors in a form data
      const errors = await validateEditData(name);

      //if there are any errors, return form with error messages
      if (errors.length > 0) {
        return fail(400, { name, errors });
      }

      // Set the body of the request, adds a header and sends put request to update habit
      const data = await axios.put(`http://localhost:3011/categories/${id}`, {
        name: name
      }, {
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
        }
      });
    } catch (error) {
      if (error.response.status == 401) {
        throw redirect(302, '/login');
      }
    }

    throw redirect(302, `/categories`);
  }
};

async function validateEditData(name) {
  let errors = [];

  //check if name exists
  if (!name) {
    errors.push({ "input": "name", "message": "Name is missing" });
  }

  return errors;
}