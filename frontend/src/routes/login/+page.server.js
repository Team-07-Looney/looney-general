import axios from "axios";
import { redirect } from '@sveltejs/kit';

export const actions = {
  login: async ({ cookies, request }) => {
    axios.defaults.withCredentials = true

    const formData = await request.formData();

    const data = await axios.post('http://localhost:3011/login', {
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

    //console.log(data.data.data.token);
    throw redirect(302, '/habits');
  }
};