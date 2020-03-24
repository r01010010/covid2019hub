var User = require('../models/user');

module.exports = {
	getUser: function(_uuid, cb){
		User.findOne({uuid: _uuid}, cb);
	}
}
