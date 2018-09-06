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

var data;
var members;

onload = (function () {
    if (document.title == "House loyalty" || document.title == "House attendance") {
        var url = "https://api.propublica.org/congress/v1/113/house/members.json";
    } else if (document.title == "Senate loyalty" || document.title == "Senate attendance") {
        var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
    }
    fetch(url, {
            headers: new Headers({
                'X-API-Key': 'TWbDXA3ZpPEHTr8hvMEgBRwGn9IoZyHLbD4V0lwD'
            })
        })
        .then(response => response.json())
        .then(realData => {

            data = realData;
            members = data.results[0].members;

            buildPage();
        })
})

function buildPage() {

    countMV();
    getLowestVotes();
    getHightestVotes();
    getMostMissed();
    getLeastMissed();

    new Vue({
        el: '#pageContent',
        data: {
            parties: statistics.firstTable,
            lowest: lowestVotes,
            hightest: hightestVotes,
            least: leastVotesMissed,
            most: mostVotesMissed
        }
    })
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
    mostVotesMissed = members.filter(elementOfMyArray => (elementOfMyArray.missed_votes_pct <= mostMissed));

    mostVotesMissed.sort((fst, snd) => fst.missed_votes_pct - snd.missed_votes_pct);
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