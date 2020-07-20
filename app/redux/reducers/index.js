import { combineReducers } from 'redux';
import { auth } from './auth';
import { campaign } from './campaign';
import { user } from './user';
import { notification } from './notification';

export const rootReducer = combineReducers({
  auth,
  campaign,
  user,
  notification
});
