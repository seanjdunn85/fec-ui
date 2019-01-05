/*
 * 
 * CongressReducer sets the currently selected congress 
 * */
import {
  REQUEST_CONGRESS,
  RECEIVE_CONGRESS
} from '../actions'

function congress(state={
    isFetching:false,
    didInvalidate:false,
    items:[]
  }, action){
  
  switch (action.type) {
    case REQUEST_CONGRESS:
      return Object.assign({}, state, {
        isFetching:true,
        didInvalidate:false
      })
      break;
    case RECEIVE_CONGRESS:
      console.log('action',action)
      return Object.assign({}, state, {
        isFetching:false,
        didInvalidate:false,
        congressMembers: action.congress,
        lastUpdated:Date.now()
      })
      break;
    default:
      return state;
  }
}

export default congress