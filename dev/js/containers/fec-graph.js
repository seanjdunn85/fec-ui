import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/index';
import {selectCongressMember} from '../actions/index';
import Graph from 'react-graph-vis';

const options = {
	    layout: {
	        hierarchical: false
	    },
	    edges: {
	        color: "#000000"
	    },
	    height:'800px'
	};

const events = {
	doubleClick:function(event){
		selectCongressMember(event);
	},
    select: function(event) {
    	console.log(event, arguments);
    }
}

class FECGraph extends Component{
	
	render(){
		console.log(this.props.FEC)
		try {
			// statements
			if(this.props.FEC.nodes.length){
				return (

					<Graph graph={this.props.FEC} options={options} events={events}>

					</Graph>
				)
			}else{
				return(
					<div>loading...{this.props.FEC.nodes.length}</div>
					)
			}
		} catch(e) {
			// statements
			console.log(e);
		}
	}

}

/*bind the fec graph state to properties*/
function mapStateToProps(state){
	return {
		FEC:state.FEC,
	}
}


export default connect(mapStateToProps)(FECGraph);