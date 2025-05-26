import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserService } from '../services/user.service.js';

passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await UserService.findByEmail(email);
    if (!user) return done(null, false, { message: 'Usuario no encontrado' });
    const isValid = await UserService.validatePassword(user, password);
    return isValid ? done(null, user) : done(null, false, { message: 'Contraseña incorrecta' });
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const user = await UserService.findById(id);
  done(null, user);
});
