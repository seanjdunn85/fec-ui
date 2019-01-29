"use strict";

/*Redis for caching and request-promise for some api calls*/
const redis = require('redis');
const requestPromise = require('request-promise');

/*Get Neo4j dependencies*/
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://localhost:11001', neo4j.auth.basic(process.env.NEO4J_USERNAME,process.env.NEO4J_PASSWORD));
const neo4jsession = driver.session();

const getMember = (req, res) => {
	return null;
}


const getCongressPersonVotes = ( member_id, offset ) => {
	const congressPersonVotesOptions = {
		  uri:`https://api.propublica.org/congress/v1/members/${member_id}/votes.json`,
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
	const congressPersonVotesRequest = requestPromise(congressPersonVotesOptions)

	return congressPersonVotesRequest;
}

const getCongressMemberFinances = (req, res) => {
	

	const fec_id = req.query.member_id;

	const resultPromise = neo4jsession.run(
	  'MATCH p=((cand:Candidate{CAND_ID:$candidate_id})<-[cc:CANDIDATE_CONTRIBUTION]-(cmte:Committee)) RETURN p',
	  {candidate_id: fec_id}
	);

	resultPromise.then(result => {

	  neo4jsession.close();
	  console.log(result)
	  res.send(result);
	  driver.close();
	}).catch((err) => {
		console.log(err)
	});

} 


const getCongress = function (req,res){

	const congressNumber = req.query.congressNumber;
	console.log(`getting congress ${congressNumber}`)
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
		const congressMembers = result[0].results[0].members.concat(result[1].results[0].members)
		res.send(congressMembers)
	}).catch((err) =>{
		/*TODO:handle error*/
	})


}

const controller = {
	all:getCongress,
	getCongressMemberFinances:getCongressMemberFinances,
	getMember:getMember,
	isValidCongressNumber:( congress ) => true,
	isValidCongressMemberId:(member_id) => true
};

module.exports = controller;