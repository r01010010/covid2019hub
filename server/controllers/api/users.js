const users = require('../../lib/users');
// const formidable = require('formidable');
const apiResponse = require('./apiResponse');

const isValidUser = (user) => {
  return true
}

const createUser = (req, res, next) => {
  console.log('API REQ createUser ... ', req.body, '');
  
  apiResponse({
    validate: isValidUser,
    req: req.body,
    res: res,
    logic: (options, res, cb) => {
      users.create(options, cb);
    },
    formatRes: user => user
  });
};

module.exports = {
	create: createUser
}
