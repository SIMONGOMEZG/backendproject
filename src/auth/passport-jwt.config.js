import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/user.model.js';

const cookieExtractor = req => req.cookies?.jwt || null;

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET || 'supersecreta'
}, async (jwtPayload, done) => {
  try {
    const user = await UserModel.findById(jwtPayload.user._id).populate('cart');
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
