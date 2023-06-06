const router = require('express').Router();
const passport = require('passport');
const Account = require('../models/accountModel');
const { urlAvatar, createSendToken } = require('../utils/constant');

router.get('/login/success', async (req, res) => {
  if (req.user) {
    const { displayName, provider, emails, photos, id } = req.user;
    const account = {
      username: displayName,
      photo: {
        url: photos ? photos[0].value : urlAvatar,
        name: displayName,
      },
      email: emails && emails[0].value,
      provider: provider,
      id: id,
    };
    let checkAccount = {};
    if (emails) {
      account.email = emails[0].value;
      checkAccount = { email: emails[0].value };
    } else {
      checkAccount = { id: id };
    }
    let user = await Account.findOne(checkAccount);
    if (user) {
      createSendToken(user, 200, req, res);
    } else {
      user = await Account.create(account);
      createSendToken(user, 200, req, res);
    }
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Something went wrong, please try again 🫣🫣 ',
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  // res.cookie('jwt', 'loggedout', {
  //   expires: new Date(Date.now() + 10 * 1000),
  //   httpOnly: true,
  //   domain: 'http:/localhost:5000',
  // });
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
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    scope: ['profile'],
    failureRedirect: '/api/v1/auth/login/failed',
  }),
);

//Facebook login
router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: process.env.CLIENT_URL,
    scope: ['profile', 'email'],
    failureRedirect: '/api/v1/auth/login/failed',
  }),
);

module.exports = router;
