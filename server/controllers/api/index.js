const users = require('../../models/users');

const createUser = function(req, res, next) {
	users.createUser(req.body, function(err, user){
		if (err) {
			console.log('Error when creating user');
			console.error(err);
			res.status(500);
			res.json({err: err});
		} else if (!user){
			console.log('No user was created, responding with 500');
			res.status(500);
			res.json({err: new Error('No user created. Unknown reason.')});
		} else {
			console.log('User created from web');
			res.json({
				user: user.toJSON()
			});
		}
	});
}

const getUsers = function(req, res, next){
  console.log('Request received for getUser');
	users.get(req.params, function(err, users){
		console.log(users)
		if (err) {
			res.status(500);
			res.json({err: err});
		} else if (!users){
			console.log('no users found...');
			res.status(204);
			res.json({err: new Error('Users not found')});
		} else {
			res.json(users);
		}
	});
};

module.exports = {
	createUser: createUser,
	getUsers: getUsers
}
