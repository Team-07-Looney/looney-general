import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';

const jwtStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

passport.use(new passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, pasword, done) => {

  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
  async (jwtPayload, done) => {

  }
));