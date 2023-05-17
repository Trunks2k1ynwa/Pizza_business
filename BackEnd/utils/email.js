/* eslint-disable no-undef */
import { convert } from 'html-to-text';
import tranposter from './nodemailer.js';
import { createAccount, passwordReset } from './template.js';

export default class Email {
  constructor(account, url) {
    this.to = account.email;
    this.password = account.password;
    this.url = url;
    this.username = account.username;
    this.from = `NATURE_BEAUTY <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return tranposter;
  }

  // Send the actual email
  async send(subject) {
    // 1) Render HTML based on a pug template
    // const html = 'Wellcome to NatureBeauy, Hope you have enjoy time with us';
    const UI = createAccount(this.username, this.to, this.password, this.url);
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: convert(UI),
      html: UI,
    };

    // 3) Create a transport and send email
    this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome', 'Welcome to the NatureBeauty Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
}
