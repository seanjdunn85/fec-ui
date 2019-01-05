import {
  REQUEST_CONGRESS,
  RECEIVE_CONGRESS
} from '../actions'

function congress(state=null, action){
  
  switch (action.type) {
    case RECEIVE_CONGRESS:
      console.log('received congress in congresses', action)
      if(state == null){
        state = {};
      }
      state[action.congress.congressNumber] = action.congress.congressMembers;
      return state
      break;
    default:
      return state;
  }

}

export default congress