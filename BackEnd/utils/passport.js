const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const Account = require('../models/accountModel');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log('🚀 ~ refreshToken:', refreshToken);
      console.log('🚀 ~ accessToken:', accessToken);
      Account.findOrCreate({ googleId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    },
  ),
);
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: '/auth/facebook/callback',
//     },
//     function(accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     },
//   ),
// );
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
