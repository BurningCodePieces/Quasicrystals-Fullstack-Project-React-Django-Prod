import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import messages from './messages';
import quasicrystals from './quasicrystals';
import loading from './loading';

export default combineReducers({
    auth,
    errors,
    messages,
    quasicrystals,
    loading
});