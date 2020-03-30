var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./server/config');
const setRoutesApi = require('./server/routes/api');
const setRoutesWeb = require('./server/routes/web');
const cors = require('cors');

mongoose.connect(config.database.uri, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
  console.log('MONGODB CONNECTION ERROR');
});

const app = module.exports.app = express();

var server = http.createServer(app);

// Add headers
// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     // Pass to next layer of middleware
//     next();
// });

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

setRoutesApi(app);
setRoutesWeb(app);

const port = process.env.PORT || 8080
server.listen(port);  //listen on port 80
// require('./app.socket.io.js')(server);

// SET TIME ZONE
process.env.TZ = 'Europe/Amsterdam';
console.log('Time Zone set to Europe/Amsterdam ' + new Date(Date.now()));
console.log(`Listening on port ${port}`);
