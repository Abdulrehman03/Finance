import { combineReducers } from 'redux';
import auth from './auth'
import client from './client'
export default combineReducers({
    auth,client
});