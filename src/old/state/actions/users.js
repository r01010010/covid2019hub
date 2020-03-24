import ACTNS from '../action_types';
import Users from '../../lib/users';

function requestCreateUser() {
  return {
    type: ACTNS.USER_CREATE,
    isFetching: true,
    err: null
  };
}

function receiveCreateUser(err, user) {
  return {
    type: ACTNS.USER_CREATE_RECEIVE,
    err,
    isFetching: false,
    user
  };
}

const create = function (user, dispatch) {
  dispatch(requestCreateUser());
  return Users.create(user, (err, userCreated) => {
    dispatch(receiveCreateUser(err, userCreated));
  });
};

export default {
  create
};
