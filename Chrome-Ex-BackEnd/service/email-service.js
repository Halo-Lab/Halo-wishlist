const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
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
      subject: 'Account activation' + 'https://inspiring-booth-23b3d0.netlify.app',
      text: '',
      html: `
        <div>
        <h1>Follow the link to activate</h1>
        <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

module.exports = new EmailService();
