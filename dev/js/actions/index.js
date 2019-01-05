import fetch from 'cross-fetch'

export const REQUEST_CONGRESS = 'REQUEST_CONGRESS'

export const RECEIVE_CONGRESS = 'RECEIVE_CONGRESS'

function requestCongress(congress){
	return {
		type:REQUEST_CONGRESS,
		congress
	}
}

function receiveCongress(congress){
	console.log('congress',congress)
	return {
		type:RECEIVE_CONGRESS,
		congress
	}
}

export const selectUser = (user) => {
	console.log("You clicked on user: " ,`${user.last}, ${user.first}`)
	/* Returns an action object */
	return {
		type:"USER_SELECTED",
		payload:user
	}
}

export const selectCongressMember = (member) => {
	console.log(member)
	console.log("You clicked on a congress member: " ,`${member.last}, ${member.first}`)
	/* Returns an action object */
	return {
		type:"CONGRESS_MEMBER_SELECTED",
		payload:member
	}
}

export function fetchCongress(congressNumber){
		//the dispatch method is passed into to the function we create, so we cad dispatch states from the API call 
		
		return function(dispatch){
			
			//requestPosts is dispatching a state to let the user know we started the request!
			
			dispatch(requestCongress(congressNumber))
			var url = new URL("http://localhost:3000/api/congress")
    		var params = {congressNumber:congressNumber}
			Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
			return fetch(url)

				.then(

				response => response.json(),


				error => console.log('an error occured')


				)
				
				.then(
					json => dispatch(receiveCongress({congressMembers:json,congressNumber:congressNumber}))
					)
		}
}


