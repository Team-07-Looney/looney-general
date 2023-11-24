import axios from 'axios';

function getToDay() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate);
  return currentDate;
}

const tempResponse = {
  meta: {
    date: getToDay(),
  },
  data: {
    message: 'this route is not implemented yet',
  },
};

export async function register(req, res) {

  const createUserResponse = await axios.post('http://msusers:3012/users', {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  console.log(createUserResponse.data);

  // let newUserEmail = response.data.data;
  // const getUserResponse = await axios.post('http://msusers:3012/users', {
  //   name: req.body.name,
  //   password: req.body.password,
  //   email: req.body.email
  // }, {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // });
}