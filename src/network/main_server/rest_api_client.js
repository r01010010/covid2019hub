import routes from './routes';
import { POST, GET, ajaxTo, isSuccessful } from './tools';

const restClient = {
  users: {
    create: (user, cb) => {
      const uri = `${routes.basepath}${routes.users.create}`;

      ajaxTo(uri, POST, user, null, (err, data, status) => {

        if (!isSuccessful(status)) {
          data = null;
        }

        cb(err, data);
      });
    },
    get: (filter = {}, cb) => {
      const uri = `${routes.basepath}${routes.users.get}/${filter.category}/${filter.placeId}`;
      console.log(uri)
      ajaxTo(uri, GET, filter, null, (err, data, status) => {

        if (!isSuccessful(status)) {
          data = null;
        }

        cb(err, data);
      });  
    }
  }
};

export default restClient;
