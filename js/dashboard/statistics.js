$(function() {

    let database = firebase.database();
    const ref = database.ref('DHT11');

    ref.on('value', gotDataRT, errData);

    const dataJson = ref.child('data');
    dataJson.on('value', gotData, errData);

    const dataAverage = ref.child('data');
    dataAverage.on('value', gotDataAverage, errData);

});

function gotData(data) {
    const ctx = document.getElementById('temperature').getContext('2d');

    let records = data.val();
    let keys = Object.keys(records);

    let myDataHum = [];
    let myDataTemp = [];
    let myTime = [];

    for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let humidity = records[k].humidity;
        let temperature = records[k].temperature.celsius;

        let unixtimestamp = records[k].time;
        let time = convert(unixtimestamp);

        myDataTemp.push(parseInt(temperature));
        myDataHum.push(parseInt(humidity));
        myTime.push(time);

        console.log(temperature, humidity, time);
    }

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: myTime,
            datasets: [{
                    label: 'H',
                    data: myDataHum,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: 'T',
                    data: myDataTemp,
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                    fill: false,
                }
            ],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return value;
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }]
            }
        }
    });
}

function gotDataRT(data) {
    let records = data.val();

    let key = Object.keys(records);
    console.log('Object: ' + key);

    let dataHum = records.Humidity;
    let dataTem = records.Temperature.Celsius;
    console.log('Humidity: ' + dataHum, 'Temperature: ' + dataTem);

    const ctx = document.getElementById('RealTime').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Humidity', 'Temperature'],
            datasets: [{
                label: 'Enviroment chart',
                data: [dataHum, dataTem],
                backgroundColor: [
                    'rgba(54, 162, 235, 255)',
                    'rgba(255, 99, 132, 255)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return value;
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Unit'
                    }
                }]
            }
        }
    });
}

function gotDataAverage(data) {
    const total = document.getElementById('TotalDatabase');

    let records = data.val();
    let key = Object.keys(records);

    let sumHum = 0;
    let sumTem = 0;

    let size = key.length;
    for (let i = 0; i < size; i++) {
        let k = key[i];

        let _humidity = records[k].humidity;
        sumHum += _humidity;

        let _temperature = records[k].temperature.celsius;
        sumTem += _temperature;
    }

    let averageHum = (sumHum / size);
    let averageTem = (sumTem / size);

    total.innerText = size;

    console.log(averageHum, averageTem);

    let ctx = document.getElementById('Average').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Humidity', 'Temperature'],
            datasets: [{
                label: '# of Votes',
                data: [averageHum, averageTem],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
    });

}

function errData(err) {
    console.log('Error data');
    console.log(err);
}

function convert(unixtimestamp) {
    // Months array
    let months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Convert timestamp to milliseconds
    let date = new Date(unixtimestamp * 25200);
    // Year
    let year = date.getFullYear();
    // Month
    let month = months_arr[date.getMonth()];
    // Day
    let day = date.getDate();
    // Hours
    let hours = date.getHours();
    // Minutes
    let minutes = "0" + date.getMinutes();
    // Seconds
    let seconds = "0" + date.getSeconds();
    // Display date time in MM-dd-yyyy h:m:s format
    let convdataTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return convdataTime;
}