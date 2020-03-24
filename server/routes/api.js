const api = require('../controllers/api');
const appi = api.appi;

module.exports = function(app){
	// app.post('/apiweb/users', users.create);

		// CRUD USERS
	app.post('/api/users', appi.createUser);
	// app.put('/api/users', appi.updateUser);

	// QUERIES
	app.get('/api/users/:uuid', appi.getUser);

	// NOTIFICATIONS
	// app.put('/api/notifications/', appi.getNotifications);
	// app.put('/api/notifications/markasviewed/:_id_notification');
};
