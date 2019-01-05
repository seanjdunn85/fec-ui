import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import allReducers from './reducers';
import App from './components/app';
import {fetchCongress} from './actions'


const store = createStore(allReducers,
		applyMiddleware(thunkMiddleware)
		);

ReactDOM.render(
	<div>
		<Provider store={store}>
	        <App/>
	    </Provider>
	</div>
    ,
    document.getElementById('root')
);
/*Currently only calling 115 because duplicate id's throw errors in the graph, ProPublica opted to include duplicates*/
store.dispatch(fetchCongress(115))