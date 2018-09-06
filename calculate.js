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

onload = (function () {
    buildPage();
})

function buildPage() {

    new Vue({
        el: '#pageContent',
        data: {
            loading: true,
            parties: statistics.firstTable,
            lowest: [],
            highest: [],
            least: [],
            most: []
        },
        beforeCreate() {
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

                    this.countMV();
                    this.getVotes("lowest");
                    this.getVotes("highest");
                    this.getVotes("least");
                    this.getVotes("most");

                    this.loading = false;
                })
        },
        methods: {
            countMV: function () {

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
            },
            getVotes: function (direction) {
                var totalMembers = statistics.firstTable[3].numberOfMembers;
                var checkedPrecent = 10;
                var checked = totalMembers / checkedPrecent;
                checked = checked.toFixed(0);

                if (direction == "lowest" || direction == "highest") {

                    if (direction == "lowest") {
                        members.sort((fst, snd) => fst.votes_with_party_pct - snd.votes_with_party_pct);
                    } else if (direction == "highest") {
                        members.sort((fst, snd) => snd.votes_with_party_pct - fst.votes_with_party_pct);
                    }

                    var votesWithParty = members[checked - 1].votes_with_party_pct;

                    if (direction == "lowest") {
                        this.lowest = members.filter(elementOfMyArray => (elementOfMyArray.votes_with_party_pct <= votesWithParty));
                    } else if (direction == "highest") {
                        this.highest = members.filter(elementOfMyArray => (elementOfMyArray.votes_with_party_pct >= votesWithParty));
                    }

                } else if (direction == "least" || direction == "most") {

                    if (direction == "least") {
                        members.sort((fst, snd) => snd.missed_votes_pct - fst.missed_votes_pct);
                    } else if (direction == "most") {
                        members.sort((fst, snd) => fst.missed_votes_pct - snd.missed_votes_pct);
                    }

                    var MissedVotes = members[checked - 1].missed_votes_pct;

                    if (direction == "least") {
                        this.least = members.filter(elementOfMyArray => (elementOfMyArray.missed_votes_pct >= MissedVotes));
                    } else if (direction == "most") {
                        this.most = members.filter(elementOfMyArray => (elementOfMyArray.missed_votes_pct <= MissedVotes));
                    }
                }
            }
        }
    })
}