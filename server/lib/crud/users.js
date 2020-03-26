var User = require('../../models/user');

module.exports = {
	createUser: function(_user, cb){
		var user = new User(_user);
		user.save(cb);
	},
	updateUser: function(_user, cb){
		User.findOne({ $or: [{_id: _user._id}, {uuid: _user.uuid}] }, function(err, user){
			if(!err && user){
				user.save(function(err, user){
					cb(err, user)
				});
			} else {
				cb(err, user);
			}
		});
	},
	get: function(filter, cb) {
		console.log('received', filter)

		filter = {
			...filter,
			category: filter.category === 'all' ? { $exists: true } : `${filter.category}`, 
			placeId: filter.placeId === 'all' ? { $exists: true } : `${filter.placeId}`,
			type: filter.type === 'all' ? { $exists: true } : `${filter.type}`,
			for_listing: true,
		}

		console.log('sent', filter)

		User.find(filter, cb);
	}
};
