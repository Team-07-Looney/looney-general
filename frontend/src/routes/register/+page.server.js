import axios from "axios";
import { redirect } from '@sveltejs/kit';
import { browser } from "$app/environment"

export const actions = {
  register: async ({ cookies, request }) => {
    axios.defaults.withCredentials = true

    const formData = await request.formData();

    const data = await axios.post('http://localhost:3011/register', {
      name: formData.get('name'),
      password: formData.get('password'),
      email: formData.get('email'),
    }, {
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded' // The header is important!
      }
    });

    cookies.set('jwt', data.data.data.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 // 1 day
    });

    console.log(data.data.data.token);
    throw redirect(302, '/habits');
  }
};