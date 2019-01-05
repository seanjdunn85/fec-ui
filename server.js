const express = require('express')
const http = require('http')
const requestPromise = require('request-promise');
const app = express()
const port = 3001


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

app.get('/api/congress', getCongress)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
