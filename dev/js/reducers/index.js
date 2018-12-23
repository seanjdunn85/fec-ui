import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import ActiveUserReducer from './reducer-active-user';
import FECReducer from './reducer-fec';

const allReducers = combineReducers({
	users:UserReducer,
	activeUser: ActiveUserReducer,
	FEC:FECReducer
})

export default allReducers;