const congressPerson = {
	
}


const getCongress = function (req,res){

	const congressNumber = req.query.congressNumber;
	
	/*TODO: validate congress number*/

	const senateOptions = {
	  uri:`https://api.propublica.org/congress/v1/${congressNumber}/senate/members.json`,
	  protocol:"https:",
	  hostname:'api.propublica.org',
	  port: 443,
	  method: 'GET',
	  headers: {
	    'X-API-Key':process.env.PROPUBLICA_KEY
	  },
	  transform: function(body, response, resolveWithFullResponse){
	  	return JSON.parse(body);

	  }
	};

	const houseOptions = {
	  uri:`https://api.propublica.org/congress/v1/${congressNumber}/house/members.json`,
	  protocol:"https:",
	  hostname:'api.propublica.org',
	  port: 443,
	  method: 'GET',
	  headers: {
	    'X-API-Key':process.env.PROPUBLICA_KEY
	  },
	  transform: function(body, response, resolveWithFullResponse){
	  	console.log('transforming')
	  	return JSON.parse(body);
	  }
	};

	const senateRequest = requestPromise(senateOptions);
	const houseRequest = requestPromise(houseOptions);

	Promise.all([senateRequest, houseRequest]).then(function(result,body, error ,etc){
		console.log('promise resolved');
		const congressMembers = result[0].results[0].members.concat(result[1].results[0].members)
		res.send(congressMembers)
	}).catch((err) =>{
		/*TODO:handle error*/
	})


}

const buildVotesQuery =function(chamber, offset){

	const votesOptions = {
	  uri:`https://api.propublica.org/congress/v1/${chamber}/votes/recent.json?offset=${offset}`,
	  protocol:"https:",
	  hostname:'api.propublica.org',
	  port: 443,
	  method: 'GET',
	  headers: {
	    'X-API-Key':process.env.PROPUBLICA_KEY
	  },
	  transform: function(body, response, resolveWithFullResponse){
	  	return JSON.parse(body);
	  }
	}

	return votesOptions;
}

const getVotes = function(req,res){
	if(typeof req.query.congress_person != 'undefined'){
		getCongressPersonVotes(req.query.congressPerson);
	}
	const houseRequest = requestPromise(buildVotesQuery('house',0));
	const senateRequest = requestPromise(buildVotesQuery('senate',0));
	Promise.all([houseRequest, senateRequest]).then(function(response){
		res.send(response)
	})
}

const getCongressPersonVotes = (req, res) => {
	const billsOptions = {
	  uri:`https://api.propublica.org/congress/v1/${congress}/both/bills/introduced.json`,
	  protocol:"https:",
	  hostname:'api.propublica.org',
	  port: 443,
	  method: 'GET',
	  headers: {
	    'X-API-Key':process.env.PROPUBLICA_KEY
	  },
	  transform: function(body, response, resolveWithFullResponse){
	  	return JSON.parse(body);
	  }
	}
};

const isValidBillFormat = ( bill ) => true; 

const isValidCongressNumber = ( congress ) => true;

const isValidCongressPersonNumber = ( cpn ) => true;

const getCongressPersonVotes = ( cpn, offset ) => {

	const congressPersonVotesRequest = requestPromise(congressPersonVotesOptions)

	return congressPersonVotesRequest;
}


const getBills = function(req, res){
res.send(req.query);
	
	const congress = req.query.congress || '116';
	
	if(
		
		typeof req.query.congress != 'undefined'

		){
		
		res.send(req.query);

	}else if (
		
		typeof req.query.congress_person != 'undefined'

		) {
		
		res.send(req.query);

	}

	const billsOptions = {
	  uri:`https://api.propublica.org/congress/v1/${congress}/both/bills/introduced.json`,
	  protocol:"https:",
	  hostname:'api.propublica.org',
	  port: 443,
	  method: 'GET',
	  headers: {
	    'X-API-Key':process.env.PROPUBLICA_KEY
	  },
	  transform: function(body, response, resolveWithFullResponse){
	  	return JSON.parse(body);
	  }
	}

	const billsRequest = requestPromise(billsOptions);

	Promise.all([billsRequest]).then(response => res.send(response))
}

app.get('/api/congress', getCongress)
app.get('/api/votes', getVotes)
app.get('/api/bills', getBills)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
