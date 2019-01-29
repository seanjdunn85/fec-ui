"use strict";

const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const port = 3001
const http = require('http')
const congress_member = require('./models/congress-member.js')
const bills = require('./models/bills.js')
const votes = require('./models/votes.js')


app.get('/api/congress', congress_member.all)

app.get('/api/contributions', congress_member.getCongressMemberFinances)

app.get('/api/votes', votes.getVotes)

app.get('/api/bills', bills.getBills)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
