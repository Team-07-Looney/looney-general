import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const load = async ({ serverLoadEvent, cookies }) => {
    try {
        const jwt = cookies.get('jwt');

        //get the data from json web token
        const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
    
        const response = await axios.get(`http://localhost:3011/users/id/${payload.id}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
    
        const user = response.data.data;
        return user;
      } catch (error) {
        if (error.response.status == 401) {
          throw redirect(302, '/login');
        }
      }
};