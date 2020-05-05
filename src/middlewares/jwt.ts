import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { secrets } from '../config/secrets'
import { User } from '../schemas/User'

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secrets.JWT_SECRET
}, (jwtToken, done) => {
  User.findOne({ id: jwtToken.id }, function (err, user) {
    if (err) { return done(err, false) }
    if (user) {
      return done(undefined, user, jwtToken)
    } else {
      return done(undefined, false)
    }
  })
}))
