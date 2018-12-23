/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */
export default function (state=null, action) {
    switch (action.type) {
        case "USER_SELECTED":
            return action.payload
            break;
        case "CONGRESS_MEMBER_SELECTED":
        	return action.payload;
        	break;
        default:
            // statements_def
            break;
    }
    return state;
}