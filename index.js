let urlArray = (window.location.search).split("?");
let allData = JSON.parse(atob(urlArray[1]));

console.log(allData);

window.onload = function pageLoad() {
    createTable(allData);
    return;
};

function createTable(dataArray) {
    // TABLE
    // Get the table
    let table = document.getElementById('table');
    // Add to body
    document.getElementById('body').appendChild(table);
    // Create the rows.
    let rows = [];
    for (let i = 0; i < dataArray.length + 1; i++) {
        rows.push(document.createElement('tr'));
    }

    // CONFIG
    let max_columns = 5;
    let NAAM = 0;
    let VOERTUIGCODE = 1;
    let KM = 3;
    let TIJDSTIP = 4;
    let VOERTUIGBESCHRIJVING = 2;

    // HEADER
    let thead = document.createElement('thead');
    table.appendChild(thead);
    let header = [];
    for (let i = 0; i != max_columns; i++) {
        header.push(document.createElement('td'));
    }

    header[NAAM].innerHTML = "Naam";
    header[VOERTUIGCODE].innerHTML = "Voertuig Code";
    header[KM].innerHTML = "km";
    header[TIJDSTIP].innerHTML = "Tijdstip";
    header[VOERTUIGBESCHRIJVING].innerHTML = "Voertuig beschrijving";
    // CONFIG

    for (let i = 0; i != max_columns; i++) {
        rows[0].appendChild(header[i]);
    }

    thead.appendChild(rows[0]);


    // BODY
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (let i = 0; i < rows.length - 1; i++) {
        let column = [];

        for (let i = 0; i != max_columns; i++) {
            column.push(document.createElement('td'));
        }


        column[NAAM].innerHTML = nameCapitals(dataArray[i].name);
        column[VOERTUIGCODE].innerHTML = dataArray[i].vehicleCode;
        column[KM].innerHTML = dataArray[i].km;
        column[TIJDSTIP].innerHTML = convertTime(dataArray[i].timeID);
        column[VOERTUIGBESCHRIJVING].innerHTML = dataArray[i].vehicleDescription;


        for (let i2 = 0; i2 != max_columns; i2++) {
            rows[i + 1].appendChild(column[i2]);
        }

        tbody.appendChild(rows[i + 1]);
    }
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