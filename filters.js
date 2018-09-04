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

    new Vue({
        el: '#table',
        data: {
            members: data.results[0].members
        }
    })

    // let membersTable = document.querySelector('#myTBody');
    // let allMembers = data.results[0].members;

    // membersTable.innerHTML = '';
    // let rowNo = 1;

    // allMembers.forEach(member => {

    //     if (showMember(member)) {
    //         let newRow = document.createElement('tr');
    //         let fullName = member.first_name + " " + (member.middle_name || "") + " " + member.last_name;
    //         let nameLink = '<a href=' + member.url + '>' + fullName + '</a>';
    //         newRow.insertCell().innerHTML = rowNo;
    //         rowNo++;
    //         newRow.insertCell().innerHTML = nameLink;
    //         newRow.insertCell().innerHTML = member.party;
    //         newRow.insertCell().innerHTML = member.state;
    //         newRow.insertCell().innerHTML = member.seniority;
    //         newRow.insertCell().innerHTML = member.votes_with_party_pct + "%";

    //         membersTable.append(newRow);
    //     }
    // });
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