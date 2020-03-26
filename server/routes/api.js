const api = require('../controllers/api');
const appi = api.appi;

module.exports = function(app){
	app.post('/api/users', appi.createUser);
	app.get('/api/users/:category/:placeId', appi.getUsers)
	app.get('/api/users/:uuid', appi.getUser);
};
