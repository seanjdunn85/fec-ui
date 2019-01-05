import {combineReducers} from 'redux';
import FECReducer from './reducer-fec';
import CongressReducer from './reducer-congress';
import CongressesReducer from './reducer-congresses';

const allReducers = combineReducers({
	FEC:FECReducer,
	congress:CongressReducer,
	congresses:CongressesReducer
})

export default allReducers;

