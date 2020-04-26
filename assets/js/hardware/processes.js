let temperature = document.getElementById('temperatureHangar').getContext('2d');
let humidity = document.getElementById('humidityHangar').getContext('2d');
let heat = document.getElementById('heatHangar').getContext('2d');

let averageTemp = document.getElementById('tempHangarOne');
let averageHum = document.getElementById('humHangarOne');
let averageHeat = document.getElementById('heatHangarOne');



let _counter = 0;
let _element = 10;

$(function() {
    let database = firebase.database();
    const ref = database.ref('WSN1');
    ref.child('data').on('value', gotData, errData);
});




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
    let date = new Date();

    let temperature = [];
    let humidity = [];
    let heat = [];

    let label = [];

    for (let i = 0; i < data.length; i++) {
        temperature.push(data[i].temperature);
        humidity.push(data[i].humidity);
        heat.push(data[i].heat);
        label.push(date);
    }

    return { temperature, humidity, heat, label, date }
}

function drawDashboard(data) {

    let averageTemperature = data.temperature.reduce((a, b) => a + b, 0) / data.temperature.length;
    let averageHumidity = data.humidity.reduce((a, b) => a + b, 0) / data.humidity.length;
    let averageHeat = data.heat.reduce((a, b) => a + b, 0) / data.heat.length;

    myDashboard(data.temperature, data.label, temperature);
    myDashboard(data.humidity, data.label, humidity);
    myDashboard(data.heat, data.label, heat);

    $('.date').text(data.date.toLocaleDateString());
    $('.time').text(data.date.toLocaleTimeString());

    average({ averageTemperature, averageHumidity, averageHeat });
}

function average(data) {
    averageTemp.innerText = parseInt(data.averageTemperature);
    averageHum.innerText = parseInt(data.averageHumidity);
    averageHeat.innerText = parseInt(data.averageHeat);
}

function myDashboard(data, label, chart) {
    label.shift();
    data.shift();

    var myChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                label: 'Hangar 1',
                data: data,
                backgroundColor: [
                    'rgba(255, 232, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 232, 132, 1)',

                ],
                borderWidth: 1,
                fill: false,
            }, ],

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
                    display: false,
                    scaleLabel: {
                        display: false,
                        labelString: "Time",
                    },
                }]
            },
            animation: {
                duration: 0
            },
        }
    });
}

function updateData() {

}

function errData(err) {
    console.alert(err);
}