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