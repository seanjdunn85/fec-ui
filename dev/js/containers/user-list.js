import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/index';

class UserList extends Component{
	createListItems(users){
		return this.props.users.map((user, key) => {
			return (
				<li 
					key={key} 
					ref={key}
					onClick={() => {this.props.selectUser(user)}}
				>
				
					{user.last}, {user.first}
				
				</li>)
		})
	}
	render(){
		return (
			<ul>
				{this.createListItems()}
			</ul>
			)
	}

}

function mapStateToProps(state){
	return {
		users:state.users
	}
}

function matchDispatchToProps(dispatch){
	return bindActionCreators({
		selectUser:selectUser
	}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(UserList);