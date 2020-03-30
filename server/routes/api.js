const api = require('../controllers/api');

module.exports = function(app){
	app.post('/api/users', api.createUser);
	app.get('/api/users/:category/:placeId/:type', api.getUsers)
};
