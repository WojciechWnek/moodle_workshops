import { postRequest, getRequest } from './service.js';
import { endpoints } from './endpoints.js';
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
    partialsDir: path.resolve('./../views'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./../views'),
  extName: '.handlebars',
};

var mailOptions = {
  from: 'wsb@wsb.gda.pl',
  to: 'wownek@gmail.com',
  subject: 'Wyniki Seminarium',
  template: 'studentTemplate',
  context: {
    student: { firstname: 'Szymon', lastname: 'Zdun' },
    grades: {
      subject: 'Seminarium magisterskie',
      trend: 'spadkowy',
      grades: [5, 5, 3],
    },
  },
};
transporter.use('compile', hbs(handlebarOptions));

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
