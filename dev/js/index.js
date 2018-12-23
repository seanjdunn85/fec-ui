import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './reducers';
import App from './components/app';


const store = createStore(allReducers);

ReactDOM.render(
	<div>
		<Provider store={store}>
	        <App/>
	    </Provider>
	</div>
    ,
    document.getElementById('root')
);