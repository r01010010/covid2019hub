const config = {
  database: {
		uri: process.env.MONGODB_URI
  },
	"server": {
		"http2": true,
		"default_lang": "EN",
		"port": 80
	},
};

module.exports = config;