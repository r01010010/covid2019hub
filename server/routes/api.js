const api = require('../controllers/api');

module.exports = function(app){
	app.post('/api/users', api.createUser);
	app.post('/api/users-get', api.getUsers)
};
