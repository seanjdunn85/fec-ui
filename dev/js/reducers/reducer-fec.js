import {REQUEST_CONGRESS, RECEIVE_CONGRESS} from '../actions';
/*
 * State of the graph
 * */

export default function(state = {nodes:[],edges:[]}, action){
  console.log(action);
  switch (action.type) {
    case REQUEST_CONGRESS:
      return Object.assign({}, state, {nodes:[], edges:[]});
      break;
    case RECEIVE_CONGRESS:
      console.log('RECEIVE_CONGRESS in FEC reducer')
      return Object.assign({}, state, {nodes:action.congress.congressMembers.map(formatCongressMemberForGraph)});
      break;
    default:
      return state;
      break;
  }
  return state;
}


const formatCongressMemberForGraph = (member, index) => {
  var fi = member.id.substring(0,1);
  member.image = `http://bioguide.congress.gov/bioguide/photo/${fi}/${member.id}.jpg`
  member.shape ="circularImage"
  member.label = `${member.first_name} ${member.last_name}`
  member.size = 30;
  member.color = (member.party == 'R' ? 'red' : 'blue');
  return member;
}