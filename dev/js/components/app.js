import React from 'react';
import FECGraph from '../containers/fec-graph';
import FECMenuBar from '../containers/fec-menu-bar';
require('../../scss/style.scss');

const App = () => (
	<div>
		<FECMenuBar/>
		<FECGraph/>
	</div>
);

export default App;