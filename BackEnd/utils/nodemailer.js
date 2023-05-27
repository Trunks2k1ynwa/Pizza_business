/* eslint-disable node/no-extraneous-require */
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const appPassword = 'omzoccguehzfcuhs';
const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL,
);
oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const accessToken = new Promise((resolve, reject) => {
  oAuth2Client.getAccessToken((err, token) => {
    if (err) {
      reject(err);
    } else {
      resolve(token);
    }
  });
});

const tranposter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    type: 'OAuth2',
    user: 'naturebeauty632001@gmail.com',
    pass: appPassword,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken,
  },
});
module.exports = tranposter;
