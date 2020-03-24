import ACTNS from '../action_types';
import Notification from '../../models/notification';

const defaultNotification = {};

const notification = (state = defaultNotification, action = {}) => {
  switch (action.type) {
    case ACTNS.NOTIFICATIONS_CLEAR: {
      return new Notification();
    }
    default:
      return state;
  }
};

export default notification;
