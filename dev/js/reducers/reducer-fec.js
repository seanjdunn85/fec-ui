import house from './house';
import senate from './senate'
/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

const sanitizeMember = (member, index) => {
  var fi = member.id.substring(0,1);
  member.image = `http://bioguide.congress.gov/bioguide/photo/${fi}/${member.id}.jpg`
  member.shape ="circularImage"
  member.label = `${member.first_name} ${member.last_name}`
  member.size = 30;
  member.color = (member.party == 'R' ? 'red' : 'blue');
  return member;
}

const houseMembers = house.results[0].members.map(sanitizeMember);
const senateMembers = senate.results[0].members.map(sanitizeMember);
const congressMembers = senateMembers.concat(houseMembers)
const graph = {
  nodes:congressMembers,
  edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
};


export default function () {
    return graph
}