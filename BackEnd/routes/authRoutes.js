const router = require('express').Router();
const passport = require('passport');

const { LoginOauth } = require('../controllers/authController');

router.get('/login/success', (req, res) => {
  const { displayName, provider, emails, photos, id } = req.user;
  const account = {
    username: displayName,
    photo: {
      url: photos ? photos[0].value : 'urlAvatar',
      name: displayName,
    },
    email: emails && emails[0].value,
    provider: provider,
    id: id,
  };
  res.status(200).json({
    data: account,
  });
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Something went wrong, please try again 🫣🫣 ',
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.clearCookie('payload');
  res.redirect(process.env.CLIENT_URL);
});

//Google login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  LoginOauth,
);

//Facebook login
router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/login/success',
    scope: ['profile', 'email'],
    failureRedirect: '/api/v1/auth/login/failed',
  }),
);

module.exports = router;
