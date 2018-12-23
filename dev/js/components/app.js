import React from 'react';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-detail';
import FECGraph from '../containers/fec-graph';
import FECMenuBar from '../containers/fec-menu-bar';
// import DrawerDemo from '../containers/drawer-demo';

require('../../scss/style.scss');

const App = () => (
	<div>
		<FECMenuBar/>
		<FECGraph/>
	</div>
);

export default App;