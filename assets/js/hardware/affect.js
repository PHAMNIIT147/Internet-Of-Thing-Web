let dynamicTemp = document.getElementById('dynamicTemp').getContext('2d');
let dynamicHum = document.getElementById('dynamicHum').getContext('2d');

let _temperature = document.getElementById('temperatureH1');
let _humidity = document.getElementById('humidityH1');
let _status = document.getElementById('status');
let warning = document.getElementById('warning');

$(function() {
    firebase.database().ref("WSN1").on('value', realData, errData);
});

function realData(data) {
    let date = new Date();
    let record = data.val();

    let temp = record.Temperature;
    let hum = record.Humidity;
    let heat = record.Heat;

    _temperature.innerText = temp;
    _humidity.innerText = hum;
    if (temp > 35) {
        _status.innerHTML = "<img src='static/images/hangar/hangar-fire-icon.png' height='200'>";

    } else {
        _status.innerHTML = "<img src='static/images/hangar/hangar-stable-icon.png' height='200'>";
    }

    realTimeChart(temp, dynamicTemp, date);
    realTimeChart(hum, dynamicHum, date);

    statusWarning(heat);
}

function realTimeChart(data, chart, date) {
    var myChart = new Chart(chart, {
        type: 'bar',
        data: {
            label: date,
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

function statusWarning(data) {
    if (data > 26 && data < 32) {
        warning.innerHTML = "<h2 style='color:#ffff66;'>Caution: fatigue is possible with prolonged exposure and activity. Continuing activity could result in heat cramps.</h2>"
    } else if (data > 32 && data > 41) {
        warning.innerHTML = "<h2 style='color:gold;'>Extreme caution: heat cramps and heat exhaustion are possible. Continuing activity could result in heat stroke.</h2>"
    } else if (data > 41 && data > 54) {
        warning.innerHTML = "<h2 style='color:darkorange;'>	Danger: heat cramps and heat exhaustion are likely; heat stroke is probable with continued activity.</h2>"
    } else {
        warning.innerHTML = "<h2 style='color:red;'>	Extreme danger: heat stroke is imminent.</h2>"
    }
}