import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../variables.env' });

/**
 * Checks if the request contains valid authentication header
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(401).send('No authentication header');
  }

  const token = authHeader && authHeader.split(' ')[1]; // Extract JWT from 'Authorization' header

  if (token) {
    // Verifies the token
    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.status(401).send('Invalid token');
      } else {
        next();
      }
    });
  } else {
    res.status(401).send('Invalid token');
  }
}
