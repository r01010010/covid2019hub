var users   = require('../../lib/crud/users');

// const isEmpty = function(str) {
// 	return (!str || 0 === str.length);
// }

// CRUD
const createUser = function(req, res, next) {
	var new_user = req.body;

	users.createUser(new_user, function(err, user){
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

// var updateUser = function(req, res, next){

// 	var user_to_update;

// 	var processRequest = function(){
// 		if (isEmpty(user_to_update._id) && isEmpty(user_to_update.uuid)) {
// 			res.status(400);
// 			res.json({
// 				err: {
// 					message: 'Invalid user'
// 				}
// 			});
// 		} else {
// 			users.updateUser(user_to_update, function(err, user){
// 				if (err) {
// 					console.error(err);
// 					res.status(500);
// 					res.json({err: err});
// 				} else if (!user){
// 					res.status(500);
// 					res.json({err: new Error('No user updated. Unknown reason, maybe not found')});
// 				} else {
// 					res.json({
// 						user: user.toJSON()
// 					});
// 				}
// 			});
// 		}
// 	}
// };

var getUsers = function(req, res, next){
  console.log('Request received for getUser');

	users.get(req.params, function(err, users){
		console.log(users)
		if (err) {
			res.status(500);
			res.json({err: err});
		} else if (!users){
			console.log('no users found...');
			res.status(204);
			res.json({err: new Error('User not found')});
		} else {
			res.json(users);
		}
	});
};

// QUERIES
var getUser = function(req, res, next){
  console.log('Request received for getUser');
	if (!req.params.uuid) {
		res.status(400);
		res.json({
			err: new Error('Invalid user uuid')
		});
	} else {
		users.getOne(req.params.uuid, function(err, user){
			if (err) {
				res.status(500);
				res.json({err: err});
			} else if (!user){
        console.log('no user...');
				res.status(204);
				res.json({err: new Error('User not found')});
			} else {
				res.json({
					user: user.toJSON()
				});
			}
		});
	}
};

module.exports = {
	createUser: createUser,
	getUsers: getUsers,
	// updateUser: updateUser,
	getUser: getUser
}
