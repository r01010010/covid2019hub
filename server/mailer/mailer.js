const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'SendGrid',
    // auth: {
    //     user: 'sendgrigemail', // generated ethereal user
    //     pass: 'password' // generated ethereal password
    // }
});

let defaultOptions = {
  es_es: {
    from: '"From Name" <from@email.com>',
    subject: 'Subject 🎉',
    text: 'Body in text format',
  }
};

const htmls = {
  'es_es': {
    other: '<html></html>',
  }
}

const sendMail = (email, role, lang) => {
  const mailOptions = Object.assign({
    to: email,
    html: htmls[lang].other
  }, defaultOptions[lang]);

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

module.exports = sendMail;