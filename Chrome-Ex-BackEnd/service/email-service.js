const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'harlamovforadds@gmail.com',
        pass: 'Harlamov12345',
      },
    });
  }

  async senActivationMail(to, link) {
    await this.transporter.sendMail({
      from: 'harlamovforadds@gmail.com',
      to,
      subject: 'Account activation' + process.env.CLIENT_URL,
      text: '',
      html: `
        <div>
        <h1>Follow the link and use the code to activate your extension account</h1>
        <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
  async senResetPasswordMail(to, password) {
    await this.transporter.sendMail({
      from: 'harlamovforadds@gmail.com',
      to,
      subject: 'Reset password' + ' ' + process.env.CLIENT_URL,
      text: '',
      html: `
        <div>
        <h1>New password</h1>
        <p>${password}</p>
        </div>
      `,
    });
  }
}

module.exports = new EmailService();
