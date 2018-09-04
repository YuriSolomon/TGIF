var statistics = {

    "firstTable": [{
            title: "Republican",
            party: "R",
            numberOfMembers: 0,
            avarageVotes: 0
        },
        {
            title: "Independent",
            party: "I",
            numberOfMembers: 0,
            avarageVotes: 0
        },
        {
            title: "Democrats",
            party: "D",
            numberOfMembers: 0,
            avarageVotes: 0
        },
        {
            title: "Total",
            party: "T",
            numberOfMembers: 0,
            avarageVotes: 0
        }
    ],
    "secondTable": [{

    }]

};

var members = data.results[0].members;

buildPage();

function buildPage() {

    countMV();
    // buildTable1();

    new Vue({
        el: '#table1',
        data: {
            parties: statistics.firstTable
        }
    })

    if (document.title == "House loyalty" || document.title == "Senate loyalty") {

        getLowestVotes();

        getHightestVotes();

        new Vue({
            el: '#table2',
            data: {
                members: lowestVotes
            }
        })

        new Vue({
            el: '#table3',
            data: {
                members: hightestVotes
            }
        })

    } else if (document.title == "House attendance" || document.title == "Senate attendance") {

        getMostMissed();

        getLeastMissed();

        new Vue({
            el: '#table4',
            data: {
                members: leastVotesMissed
            }
        })

        new Vue({
            el: '#table5',
            data: {
                members: hightestVotesMissed
            }
        })
    }
}

//CALCULATIONS

function countMV() {

    for (let j = 0; j < statistics.firstTable.length; j++) {
        var check = statistics.firstTable[j];
        var count = 0;
        for (let i = 0; i < members.length; i++) {
            var party = data.results[0].members[i].party;
            if (party == check.party) {
                count++;
            } else if (check.party == "T") {
                count++;
            }
            check.numberOfMembers = count;
        }

        var votes = 0;
        if (count != 0) {
            for (let i = 0; i < members.length; i++) {
                var party = data.results[0].members[i].party;
                var votesP = data.results[0].members[i].votes_with_party_pct;
                if (party == check.party) {
                    votes = votesP + votes;
                } else if (check.party == "T") {
                    votes = votesP + votes;
                }
            }
            check.avarageVotes = votes / count;
            check.avarageVotes = check.avarageVotes.toFixed(2);
        } else {
            check.avarageVotes = 0;
        }
    }
}

//lowest votes
function getLowestVotes() {

    var totalMembers = statistics.firstTable[3].numberOfMembers;
    var checkedPrecent = 10;
    var checked = totalMembers / checkedPrecent;
    checked = checked.toFixed(0);

    members.sort((fst, snd) => fst.votes_with_party_pct - snd.votes_with_party_pct);

    var lowestVotesWithParty = members[checked - 1].votes_with_party_pct;
    lowestVotes = members.filter(elementOfMyArray => (elementOfMyArray.votes_with_party_pct <= lowestVotesWithParty));

    lowestVotes.sort((fst, snd) => fst.votes_with_party_pct - snd.votes_with_party_pct);
}

//hightest votes
function getHightestVotes() {

    var totalMembers = statistics.firstTable[3].numberOfMembers;
    var checkedPrecent = 10;
    var checked = totalMembers / checkedPrecent;
    checked = checked.toFixed(0);

    members.sort((fst, snd) => snd.votes_with_party_pct - fst.votes_with_party_pct);

    var hightestVotsWithParty = members[checked - 1].votes_with_party_pct;
    hightestVotes = members.filter(elementOfMyArray => (elementOfMyArray.votes_with_party_pct >= hightestVotsWithParty));

    hightestVotes.sort((fst, snd) => snd.votes_with_party_pct - fst.votes_with_party_pct);
}

//most missed votes
function getMostMissed() {

    var totalMembers = statistics.firstTable[3].numberOfMembers;
    var checkedPrecent = 10;
    var checked = totalMembers / checkedPrecent;
    checked = checked.toFixed(0);

    members.sort((fst, snd) => fst.missed_votes_pct - snd.missed_votes_pct);

    var mostMissed = members[checked - 1].missed_votes_pct;
    hightestVotesMissed = members.filter(elementOfMyArray => (elementOfMyArray.missed_votes_pct <= mostMissed));

    hightestVotesMissed.sort((fst, snd) => fst.missed_votes_pct - snd.missed_votes_pct);
}

//least missed votes
function getLeastMissed() {

    var totalMembers = statistics.firstTable[3].numberOfMembers;
    var checkedPrecent = 10;
    var checked = totalMembers / checkedPrecent;
    checked = checked.toFixed(0);

    members.sort((fst, snd) => snd.missed_votes_pct - fst.missed_votes_pct);

    var leastMissed = members[checked - 1].missed_votes_pct;
    leastVotesMissed = members.filter(elementOfMyArray => (elementOfMyArray.missed_votes_pct >= leastMissed));

    leastVotesMissed.sort((fst, snd) => snd.missed_votes_pct - fst.missed_votes_pct);
}

//option to build a table without Vue
// function buildTable1() {

//     let avarageTable = document.querySelector('#myTBody1');

//     statistics.firstTable.forEach(party => {

//         let newRow = document.createElement('tr');
//         newRow.insertCell().innerHTML = party.title;
//         newRow.insertCell().innerHTML = party.numberOfMembers;
//         newRow.insertCell().innerHTML = party.avarageVotes;

//         avarageTable.append(newRow);
//     });

// }