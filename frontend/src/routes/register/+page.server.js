import axios from "axios";

export const actions = {
  register: async ({ request }) => {
    const formData = await request.formData();

    const data = await axios.post('http://localhost:3011/register', {
      name: formData.get('name'),
      password: formData.get('password'),
    }, {
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
      }
    });
  }
};