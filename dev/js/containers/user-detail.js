import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/index';


class UserDetail extends Component{

	render(){
		if(!this.props.user){
			return (
				<h3>No user selected</h3>
				);
		}else{
			return (
				<div>
					<img src={this.props.user.thumbnail}/>
					<h2>{this.props.user.first} {this.props.user.last}</h2>
					<h3>Age: {this.props.user.age}</h3>
					<h3>Description: {this.props.user.description}</h3>
					<h3></h3>
				</div>
				)
			
		}
	}

}

function mapStateToProps(state){
	return {
		user:state.activeUser
	}
}

function matchDispatchToProps(dispatch){
	return bindActionCreators({
		selectUser:selectUser
	}, dispatch)
}

export default connect(mapStateToProps)(UserDetail);