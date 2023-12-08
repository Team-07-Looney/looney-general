// import axios from "axios";

// export const load = async ({ cookies }) => {
//     let isUserAuth = false;
  
//     try {
//       // Get the cookie containing the JWT token
//       const jwt = cookies.get('jwt');
  
//       // Send request to the apigateway to check if the user is authenticated
//       const isAuthenticated = await axios.get('http://localhost:3011/verify', {
//         headers: {
//           'Authorization': `Bearer ${jwt}`
//         }
//       });
  
//       if (isAuthenticated.data.message == "User is authenticated") {
//         isUserAuth = true;
//       }
//     } catch (error) {
//       console.log(error);
//     }
  
  
//     // If they are authenticated they should not be able to access the login
//     // Svelte issue with throwing redirect within a try-catch block workaround
//     if (isUserAuth) {
//       throw redirect(302, "/habits");
//     }
//   };