import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_SMTP_USERNAME,
    pass: process.env.GMAIL_SMTP_PASSWORD,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve('src/emails/templates'),

    defaultLayout: false,
  },
  viewPath: path.resolve('src/emails/templates'),
  extName: '.handlebars',
};

transporter.use('compile', hbs(handlebarOptions));

const sendEmail = (mailOptions) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export default sendEmail;
