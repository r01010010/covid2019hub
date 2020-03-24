const User = require('../models/user');
const log = require('./users.log');
const sendMail = require('../mailer/mailer');

function create(options, cb) {
	log.create(options);

	var user = new User(options);
	user.save()
		.then((data) => {
			sendMail(data.email, data.role, data.lang);
			cb(null, data);
		})
		.catch(err => {
			log.create_error(err);
		});
}

module.exports = {
  create
}
