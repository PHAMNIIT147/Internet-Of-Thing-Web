var firebaseConfig = {
    apiKey: "AIzaSyDgkKeQntDxsqwdgf1tfp9E9cOWQWT08RQ",
    authDomain: "zipi-iot-aa1c7.firebaseapp.com",
    databaseURL: "https://zipi-iot-aa1c7.firebaseio.com",
    projectId: "zipi-iot-aa1c7",
    storageBucket: "zipi-iot-aa1c7.appspot.com",
    messagingSenderId: "1079705391061",
    appId: "1:1079705391061:web:b2d4c51c4b835fd415375c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

axios.get('https://api.thevirustracker.com/free-api?countryTotals=ALL').then(function(response) {
    let rawData = arrData(response.data.countryitems[0]);
    myTable(rawData);
}).catch(function(error) {
    console.log(error);
})

axios.interceptors.response.use(function(response) {
    response.config.metadata.endTime = new Date()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    console.log(response);
}, function(error) {
    error.config.metadata.endTime = new Date();
    error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
    return Promise.reject(error);
});

function arrData(objData) {
    let arrayData = Object.keys(objData).map(function(key) {
        return objData[key]
    });
    return myData(arrayData);
}

function myData(data) {
    console.log(data);
    let list = [];
    let getRecovered = [];
    let getDeath = [];
    let getConfirm = [];

    let sumRecovered = 0;
    let sumDeath = 0;
    let sumConfirm = 0;
    data.forEach(function(item) {
        list.push([
            item.title,
            item.total_cases,
            item.total_new_cases_today,
            item.total_deaths,
            item.total_new_deaths_today,
            item.total_recovered,
            item.total_active_cases,
        ]);

        getRecovered.push(item.total_recovered);
        getDeath.push(item.total_deaths);
        getConfirm.push(item.total_cases);

        for (let i = 0; i < item.length; i++) {
            if (item.title == undefined) {}
        }
        writeNewPost(item.title, item.code, item.source, item.total_cases, item.total_new_cases_today, item.total_deaths, item.total_new_deaths_today, item.total_active_cases, item.total_serious_cases, item.total_recovered);

    });
    /* console.log(list.slice(0, 182)); */
    for (let i = 0; i < getRecovered.length; i++) {
        /* preccing NaN */
        if (isNaN(getRecovered[i])) {
            break;
        }
        sumDeath += getDeath[i];
        sumRecovered += getRecovered[i];
        sumConfirm += getConfirm[i];
    }
    /*     console.log("Recovered: " + sumRecovered, "Deaths: " + sumDeath, "Confirmed: " + sumConfirm); */
    document.getElementById('deaths').innerText = sumDeath;
    document.getElementById('recovereds').innerText = sumRecovered;
    document.getElementById('confirmeds').innerText = sumConfirm;
    document.getElementById('infected').innerText = sumConfirm - sumRecovered;
    return list.slice(0, 182);
}

function myTable(dataSet) {
    let myDataTable = $('#datatable').DataTable({
        data: dataSet,
        columns: [
            { title: "Countries and territories" },
            { title: "Cases" },
            { title: "New cases" },
            { title: "Deaths" },
            { title: "New Deaths" },
            { title: "Recoveries" },
            { title: "Active" }
        ],
        order: [
            [1, "desc"]
        ]
    });
    return myDataTable;
}

/* solution patern */
function writeNewPost(_title, _code, _source, _case, _new_case, _deaths, _new_deaths, _activated, _serious, _recovered) {
    if (_title == undefined) {
        _title = "undefined";
        _code = "undefined";
        _case = "undefined";
        _new_case = "undefined";
        _deaths = "undefined";
        _new_deaths = "undefined";
        _activated = "undefined";
        _serious = "undefined";
        _recovered = "undefined";
        _source = "none"
    }
    // A post entry.
    var postData = {
        country: _title,
        code: _code,
        confirm: {
            case: _case,
            newCase: _new_case,
        },
        die: {
            deaths: _deaths,
            newDeaths: _new_deaths,
        },
        activated: _activated,
        serious: _serious,
        recovered: _recovered,
        url: _source,
    };

    console.log("Helllo Post");
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/countries-posts/' + _title + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}