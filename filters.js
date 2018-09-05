onload = (function () {
    if (document.title == "House data") {
        var url = "https://api.propublica.org/congress/v1/113/house/members.json";
    } else if (document.title == "Senate data") {
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

            buildTable();
        })
})


function buildTable() {

    let app = new Vue({
        el: '#filters',
        data: {
            part: [],
            checkedParty: members,
            state: members,
            members: members,
            selected: "all",
            options: [{
                    value: "all",
                    text: "All"
                },
                {
                    value: "AL",
                    text: "Alabama"
                },
                {
                    value: "AK",
                    text: "Alaska"
                },
                {
                    value: "AZ",
                    text: "Arizona"
                },
                {
                    value: "AR",
                    text: "Arkansas"
                },
                {
                    value: "CA",
                    text: "California"
                },
                {
                    value: "CO",
                    text: "Colorado"
                },
                {
                    value: "CT",
                    text: "Connecticut"
                },
                {
                    value: "DE",
                    text: "Delaware"
                },
                {
                    value: "DC",
                    text: "District Of Columbia"
                },
                {
                    value: "FL",
                    text: "Florida"
                },
                {
                    value: "GA",
                    text: "Georgia"
                },
                {
                    value: "HI",
                    text: "Hawaii"
                },
                {
                    value: "ID",
                    text: "Idaho"
                },
                {
                    value: "IL",
                    text: "Illinois"
                },
                {
                    value: "IN",
                    text: "Indiana"
                },
                {
                    value: "IA",
                    text: "Iowa"
                },
                {
                    value: "KS",
                    text: "Kansas"
                },
                {
                    value: "KY",
                    text: "Kentucky"
                },
                {
                    value: "LA",
                    text: "Louisiana"
                },
                {
                    value: "ME",
                    text: "Maine"
                },
                {
                    value: "MD",
                    text: "Maryland"
                },
                {
                    value: "MA",
                    text: "Massachusetts"
                },
                {
                    value: "MI",
                    text: "Michigan"
                },
                {
                    value: "MN",
                    text: "Minnesota"
                },
                {
                    value: "MS",
                    text: "Mississippi"
                },
                {
                    value: "MO",
                    text: "Missouri"
                },
                {
                    value: "MT",
                    text: "Montana"
                },
                {
                    value: "NE",
                    text: "Nebraska"
                },
                {
                    value: "NV",
                    text: "Nevada"
                },
                {
                    value: "NH",
                    text: "New Hampshire"
                },
                {
                    value: "NJ",
                    text: "New Jersey"
                },
                {
                    value: "NM",
                    text: "New Mexico"
                },
                {
                    value: "NY",
                    text: "New York"
                },
                {
                    value: "NC",
                    text: "North Carolina"
                },
                {
                    value: "ND",
                    text: "North Dakota"
                },
                {
                    value: "OH",
                    text: "Ohio"
                },
                {
                    value: "OK",
                    text: "Oklahoma"
                },
                {
                    value: "OR",
                    text: "Oregon"
                },
                {
                    value: "PA",
                    text: "Pennsylvania"
                },
                {
                    value: "RI",
                    text: "Rhode Island"
                },
                {
                    value: "SC",
                    text: "South Carolina"
                },
                {
                    value: "SD",
                    text: "South Dakota"
                },
                {
                    value: "TN",
                    text: "Tennessee"
                },
                {
                    value: "TX",
                    text: "Texas"
                },
                {
                    value: "UT",
                    text: "Utah"
                },
                {
                    value: "VT",
                    text: "Vermont"
                },
                {
                    value: "VA",
                    text: "Virginia"
                },
                {
                    value: "WA",
                    text: "Washington"
                },
                {
                    value: "WV",
                    text: "West Virginia"
                },
                {
                    value: "WI",
                    text: "Wisconsin"
                },
                {
                    value: "WY",
                    text: "Wyoming"
                }
            ]
        },
        methods: {
            myFilter() {

                Vue.nextTick(function () {
                    if (this.part.length == 0) {
                        this.checkedParty = this.members;
                    } else {
                        this.checkedParty = this.members.filter(partyMembers => this.part.includes(partyMembers.party));
                    }

                    if (this.selected == "all") {
                        this.state = this.checkedParty;
                    } else {
                        this.state = this.checkedParty.filter(selectedState => this.selected.includes(selectedState.state));
                    }

                }.bind(this))
            }
        }
    })
}





// function showMember(oneMember) {

//     let partyFilterValue = false;
//     let stateFilterValue = false;

//     //A way to make the click methode in one line
//     // document.querySelector('#partyR').addEventListener('click', buildTable);
//     let checkboxR = document.querySelector('#partyR');
//     checkboxR.addEventListener('click', buildTable);
//     let checkboxI = document.querySelector('#partyI');
//     checkboxI.addEventListener('click', buildTable);
//     let checkboxD = document.querySelector('#partyD');
//     checkboxD.addEventListener('click', buildTable);

//     let stateSelecor = document.querySelector('#stateSelect');
//     stateSelecor.addEventListener('change', buildTable);

//     let checkedCheckbox = [];

//     checkedCheckbox = Array.from(document.querySelectorAll('input[name=party]:checked')).map(arrayElement => arrayElement.value);

//     // console.log(checkedCheckbox);

//     if (checkedCheckbox.includes(oneMember.party) || checkedCheckbox.length == 0) {
//         partyFilterValue = true;
//     }

//     if (stateSelecor.value == oneMember.state || stateSelecor.value == 'all') {
//         stateFilterValue = true;
//     }

//     return partyFilterValue && stateFilterValue;
// }