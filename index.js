let functionURL = "https://juri-km-test.azurewebsites.net/api/ikbenadmin/true"

let urlArray = (window.location.search).split("?");

window.onload = function pageLoad() {
    let currentTime = new Date() / 1; // In milimeter
    if (urlArray.length == 1) {
        window.location.replace(functionURL);
    }
    else if (currentTime - urlArray[2] > 5000) {
        window.location.replace(functionURL);
    }

    let allData = JSON.parse(atob(urlArray[1]));

    createTable2(allData);
    return;
};

function createTable2(dataArray) {
    let table = document.getElementById('table');

    // Create thread and tbody
    table.innerHTML = `<thead id ='thead'></thead>
    <tbody id = 'tbody'></tbody>`;
    let thead = document.getElementById('thead');
    let tbody = document.getElementById('tbody');

    // Fill in thead
    thead.innerHTML = `
    <tr><td>Naam</td>
    <td>Voertuig Code</td>
    <td>Voertuig beschrijving</td>
    <td>km</td>
    <td>Tijdstip</td></tr>`
    

    // Reduce the JSON array
    let bodyData = dataArray.reduce((previousValue, cv) => previousValue + 
    (`<tr>
    <td>${cv.name}<td>
    <td>${cv.vehicleCode}<td>
    <td>${cv.vehicleDescription}</td>
    <td>${cv.km}</td>
    <td>${cv.timeID}</td>
    </tr>`))

    // Fill in tbody
    tbody.innerHTML = bodyData 
}

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