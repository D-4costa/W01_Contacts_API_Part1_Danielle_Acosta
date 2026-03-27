import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
  '/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

// LOGOUT
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

export default router;
