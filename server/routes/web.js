const web = require('../controllers/web');

module.exports = function(app){
	app.get('/ping', (req, res) => {
		return res.send('pong');
	});
	app.get('/', web.home);
};
