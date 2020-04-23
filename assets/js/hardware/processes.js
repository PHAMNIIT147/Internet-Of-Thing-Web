let temperature = document.getElementById('temperatureHangar').getContext('2d');
let humidity = document.getElementById('humidityHangar').getContext('2d');
let dynamicTemp = document.getElementById('dynamicTemp').getContext('2d');
let dynamicHum = document.getElementById('dynamicHum').getContext('2d');

let averageTemp = document.getElementById('tempHangarOne');
let averageHum = document.getElementById('humHangarOne');
/* innerText */
let _temperature = document.getElementById('temperatureH1');
let _humidity = document.getElementById('humidityH1');
let _status = document.getElementById('status')


$(function() {
    let database = firebase.database();

    const ref = database.ref('DHT11');

    ref.on('value', realData, errData);

    ref.child('data').on('value', gotData, errData);

});

function realData(data) {

    let record = data.val();

    let temp = record.Temperature;
    let hum = record.Humidity;
    _temperature.innerText = temp;
    _humidity.innerText = hum;
    if (temp > 35) {
        _status.innerHTML = "<img src='static/images/hangar/hangar-fire-icon.png' height='200'>";
    } else {
        _status.innerHTML = "<img src='static/images/hangar/hangar-stable-icon.png' height='200'>";
    }

    realTimeChart(temp, dynamicTemp);
    realTimeChart(hum, dynamicHum);
}


function gotData(data) {
    let records = data.val();
    let drawChart = arrayData(records);

    drawDashboard(drawChart);
}

function arrayData(objData) {
    let arrData = Object.keys(objData).map(function(key) {
        return objData[key];
    })

    return myData(arrData);
}

function myData(data) {
    let temperature = [];
    let humidity = [];
    let counter = [];

    for (let i = 0; i < data.length; i++) {
        temperature.push(data[i].temperature);
        humidity.push(data[i].humidity);
        counter.push(i);
    }

    return { temperature, humidity, counter }
}

function drawDashboard(data) {
    let date = new Date();

    let averageTemperature = data.temperature.reduce((a, b) => a + b, 0) / data.temperature.length;
    let averageHumidity = data.humidity.reduce((a, b) => a + b, 0) / data.humidity.length;

    myDashboard(data.temperature, data.counter, temperature);

    myDashboard(data.humidity, data.counter, humidity);

    $('.date').text(date.toLocaleDateString());
    $('.time').text(date.toLocaleTimeString());

    average({ averageTemperature, averageHumidity });
}

function average(data) {
    averageTemp.innerText = parseInt(data.averageTemperature);
    averageHum.innerText = parseInt(data.averageHumidity);
}

function myDashboard(mData, label, chart) {
    var myChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                    label: 'Hangar 1',
                    data: mData,
                    backgroundColor: [
                        'rgba(255, 232, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 232, 132, 1)',

                    ],
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: 'Hangar 2',
                    data: mData,
                    backgroundColor: [
                        'rgba(255, 12, 35, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 12, 35, 1)',

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
                        fontSize: 12,
                        callback: function(value) {
                            return value;
                        },
                        max: 100,
                        min: 10,
                        stepSize: 10
                    },
                    scaleLabel: {
                        display: true,
                    },
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Time",
                    },
                    ticks: {
                        display: false,
                        min: 10,
                        stepSize: 200
                    }
                }]
            },
            animation: {
                duration: 0
            },
        }
    });
}

function errData(err) {
    console.alert(err);
}

function realTimeChart(data, chart) {
    var myChart = new Chart(chart, {
        type: 'bar',
        label: ['Hangar 1'],
        data: {
            datasets: [{
                label: 'Real-Time',
                data: [data],
                backgroundColor: [
                    'rgba(255, 232, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 232, 132, 1)',

                ],
                borderWidth: 1,
                fill: false,
            }],

        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        fontSize: 12,
                        callback: function(value) {
                            return value;
                        },
                        max: 100,
                        min: 10,
                        stepSize: 10
                    },
                    scaleLabel: {
                        display: true,
                    },
                }],
            },
            animation: {
                duration: 0
            },
        }
    });
}