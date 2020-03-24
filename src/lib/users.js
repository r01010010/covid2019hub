import api from '../network/main_server/rest_api_client';

class Users {
  static create(options, cb) {
    api.users.create(options, (err, res) => {
      cb(err, res);
    });
  }
}

export default Users;
