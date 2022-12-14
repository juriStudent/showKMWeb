// Get the JSON using JQuerry. 
$.getJSON("https://juri-km-test.azurewebsites.net/api/true", function (data) {
    createTable(data);
});

function createTable(dataArray) {
    let table = document.getElementById('table');

    // Create thread and tbody
    table.innerHTML = `
    <thead id ='thead'></thead>
    <tbody id = 'tbody'></tbody>`;
    let thead = document.getElementById('thead');
    let tbody = document.getElementById('tbody');

    // Fill in thead
    thead.innerHTML = `
    <tr><td>Naam</td>
    <td>Voertuig Code</td>
    <td>Voertuig beschrijving</td>
    <td>km</td>
    <td>Tijdstip</td></tr>`;


    // Reduce the JSON array
    let bodyData = dataArray.reduce(function (previousValue, cv) {
        return previousValue +
            (`<tr>
            <td>${nameCapitals(cv.name)}</td>
            <td>${cv.vehicleCode}</td>
            <td>${cv.vehicleDescription}</td>
            <td>${cv.km}</td>
            <td>${convertTime(cv.timeID)}</td>
            </tr>`);
    }, "");

    // Fill in tbody
    tbody.innerHTML = bodyData;
}

function convertTime(seconds) {
    let dateObj = new Date(seconds * 1000);

    let hours = doubleDigits(dateObj.getHours());
    let mins = doubleDigits(dateObj.getMinutes());
    let secs = doubleDigits(dateObj.getSeconds());


    let day = doubleDigits(dateObj.getUTCDate());
    let month = doubleDigits(dateObj.getUTCMonth() + 1);
    let year = doubleDigits(dateObj.getUTCFullYear());

    newdate = day + "/" + month + "/" + year + " - " + hours + ":" + mins + ":" + secs;

    return newdate;
}

function doubleDigits(number) {
    let string = String(number);
    if (string.length == 1) {
        string = "0" + string;
    }
    return string;
}

function nameCapitals(name) {
    let nameArray = name.split(" ");

    let capitalName = "";
    for (let i = 0; i != nameArray.length; i++) {
        // Fixes the space at the end
        let endChar = " ";
        if (i == nameArray.length - 1) {
            endChar = "";
        }
        capitalName += nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1) + endChar;
    }
    return capitalName;
}