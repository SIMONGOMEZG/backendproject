import passport from 'passport';

export const authJWT = passport.authenticate('jwt', { session: false });

export const getCurrentUser = (req, res) => {
  res.json({ user: req.user });
};
