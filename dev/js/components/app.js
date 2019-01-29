import React from 'react';
import FECGraph from '../containers/fec-graph';
import FECMenuBar from '../containers/fec-menu-bar';
import Button from '@material-ui/core/Button';
require('../../scss/style.scss');

const sayHola = function(param){
	alert('Hola');
	if(typeof param != 'undefined'){
		console.log(param)
	}
}
const App = () => (
	<div>

		<FECMenuBar/>
		<FECGraph/>
	</div>
);

export default App;