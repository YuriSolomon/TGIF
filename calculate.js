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
    buildTable1();

    if (document.title == "House loyalty" || document.title == "Senate loyalty") {

        getLowestVotes();
        buildTable2();

        getHightestVotes();
        buildTable3();

    } else if (document.title == "House attendance" || document.title == "Senate attendance") {

        getMostMissed();
        buildTable5();

        getLeastMissed();
        buildTable4();
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

//Table
function buildTable1() {

    let avarageTable = document.querySelector('#myTBody1');

    statistics.firstTable.forEach(party => {

        let newRow = document.createElement('tr');
        newRow.insertCell().innerHTML = party.title;
        newRow.insertCell().innerHTML = party.numberOfMembers;
        newRow.insertCell().innerHTML = party.avarageVotes;

        avarageTable.append(newRow);
    });

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

function buildTable2() {
    let leastEngaged = document.querySelector('#myTBody2');

    lowestVotes.forEach(member => {

        let partyVotes = (member.total_votes - member.missed_votes) * member.votes_with_party_pct / 100;
        partyVotes = partyVotes.toFixed(0);
        let newRow = document.createElement('tr');
        let fullName = member.first_name + " " + (member.middle_name || "") + " " + member.last_name;
        newRow.insertCell().innerHTML = fullName;
        newRow.insertCell().innerHTML = partyVotes;
        newRow.insertCell().innerHTML = member.votes_with_party_pct;

        leastEngaged.append(newRow);
    });
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

function buildTable3() {
    let leastEngaged = document.querySelector('#myTBody3');

    hightestVotes.forEach(member => {

        let partyVotes = (member.total_votes - member.missed_votes) * member.votes_with_party_pct / 100;
        partyVotes = partyVotes.toFixed(0);
        let newRow = document.createElement('tr');
        let fullName = member.first_name + " " + (member.middle_name || "") + " " + member.last_name;
        newRow.insertCell().innerHTML = fullName;
        newRow.insertCell().innerHTML = partyVotes;
        newRow.insertCell().innerHTML = member.votes_with_party_pct;

        leastEngaged.append(newRow);
    });
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

function buildTable5() {
    let mostMissedVotes = document.querySelector('#myTBody5');

    hightestVotesMissed.forEach(member => {

        let newRow = document.createElement('tr');
        let fullName = member.first_name + " " + (member.middle_name || "") + " " + member.last_name;
        newRow.insertCell().innerHTML = fullName;
        newRow.insertCell().innerHTML = member.missed_votes;
        newRow.insertCell().innerHTML = member.missed_votes_pct;

        mostMissedVotes.append(newRow);
    });
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

function buildTable4() {
    let leastMissedVotes = document.querySelector('#myTBody4');

    leastVotesMissed.forEach(member => {

        let newRow = document.createElement('tr');
        let fullName = member.first_name + " " + (member.middle_name || "") + " " + member.last_name;
        newRow.insertCell().innerHTML = fullName;
        newRow.insertCell().innerHTML = member.missed_votes;
        newRow.insertCell().innerHTML = member.missed_votes_pct;

        leastMissedVotes.append(newRow);
    });
}