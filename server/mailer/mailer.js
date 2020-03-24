'use strict';
const nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: 'SendGrid',
    auth: {
        user: 'app86096895@heroku.com', // generated ethereal user
        pass: '4mikehbv0154' // generated ethereal password
    }
});

let defaultOptions = {
  es_es: {
    from: '"MVP Hunter ⚽" <all@mvphunter.es>',
    subject: 'Bienvenido a MVP Hunter 🎉',
    text: 'Bienvenido a MVP Hunter',
  },
  en_en: {
    from: '"MVP Hunter ⚽" <all@mvphunter.es>', 
    subject: 'Welcome to MVP Hunter 🎉',
    text: 'Welcome to MVP Hunter',
  }
};

const htmls = {
  'es_es': {
    player: '<html lang="es"><head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes"></head><body style="font-family: Arial; margin: 0;"> <div class="mail_main" style="justify-content: center;align-items: center;align-self: center;text-align: center;color: #111;padding: 50px; color: #111"> <div class="title" style="text-transform: none;font-weight: 600;font-size: 30px;align-self: center;text-align: center;">Enhorabuena!</div><div class="subtitle" style="font-size: 18px;font-weight: 500;color: #00aa00;align-self: center;text-align: center;">Bienvenido a MVP Hunter! </div><div class="body" style="padding-top: 30px;text-align: center;align-self: center;">Ya puedes empezar a subir tus videos para mostrar al mundo tu talento.<br><br>Es muy facil, puedes enviarlos tanto por email a <a href="videos@mvphunter.es" style="color: #00aa00;">videos@mvphunter.es</a> como por whatsapp <a href="whatsapp://send?phone=34655365886" style="color: #00aa00;">+34 655 365 886</a> indicando tu edad y el correo electronico con el que te has registrado.<br><br>Recuerda invitar a tus amigos para que puedan votar, compartir tus videos y conseguir ser uno de los deportistas mas valorados del ranking.<br><br>Un saludo del equipo de MVP Hunter.</div></div></body></html>',

    other: '<html lang="es"><head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes"></head><body style="font-family: Arial; margin: 0;"> <div class="mail_main" style="justify-content: center;align-items: center;align-self: center;text-align: center;color: #111;padding: 50px; color: #111"> <div class="title" style="text-transform: none;font-weight: 600;font-size: 30px;align-self: center;text-align: center;">Enhorabuena!</div><div class="subtitle" style="font-size: 18px;font-weight: 500;color: #00aa00;align-self: center;text-align: center;">Bienvenido a MVP Hunter! </div><div class="body" style="padding-top: 30px;text-align: center;align-self: center;">Enhorabuena, ya formas parte de MVP hunter. Muy pronto podrás empezar a visionar videos en nuestro canal, seguir, invertir y rentabilizar en los cracks del futuro. <br><br>No dudes en contactar con nosotros para cualquier duda o sugerencia.<br><br>Un saludo del equipo de MVP Hunter.</div></div></body></html>'
  }
}

const sendMail = (email, role, lang) => {
  const mailOptions = Object.assign({
    to: email,
    html: role === 'player' ? htmls[lang][role] : htmls[lang]['other']
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

// });
