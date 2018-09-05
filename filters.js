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
            members: members
        },
        methods: {
            myFilter() {

                Vue.nextTick(function () {
                    if (this.part.length == 0) {
                        this.checkedParty = this.members;
                    } else {
                        this.checkedParty = this.members.filter(partyMembers => this.part.includes(partyMembers.party));
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