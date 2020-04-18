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
            item.total_deaths,
            item.total_recovered,
            item.total_active_cases,
        ]);
        getRecovered.push(item.total_recovered);
        getDeath.push(item.total_deaths);
        getConfirm.push(item.total_cases);
    });
    console.log(list.slice(0, 182));
    for (let i = 0; i < getRecovered.length; i++) {
        /* preccing NaN */
        if (isNaN(getRecovered[i])) {
            break;
        }
        sumDeath += getDeath[i];
        sumRecovered += getRecovered[i];
        sumConfirm += getConfirm[i];
    }
    console.log("Recovered: " + sumRecovered, "Deaths: " + sumDeath, "Confirmed: " + sumConfirm);
    document.getElementById('deaths').innerText = sumDeath;
    document.getElementById('recovereds').innerText = sumRecovered;
    document.getElementById('confirmeds').innerText = sumConfirm;
    return list.slice(0, 182);
}

function myTable(dataSet) {
    let myDataTable = $('#datatable').DataTable({
        data: dataSet,
        columns: [
            { title: "Countries and territories" },
            { title: "Cases" },
            { title: "Deaths" },
            { title: "Recoveries" },
            { title: "Active" }
        ],
        order: [
            [1, "desc"]
        ]
    });
    return myDataTable;
}