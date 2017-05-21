// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import config from './config';

const rootReducer = combineReducers({
  config,
  router,
});

export default rootReducer;
