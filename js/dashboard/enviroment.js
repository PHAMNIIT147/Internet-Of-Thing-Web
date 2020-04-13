const ctx = document.getElementById('temperature').getContext('2d');
const total = document.getElementById('TotalDatabase');

$(function() {

    let database = firebase.database();
    const dataJsonReference = database.ref('DHT11').child('data');

    dataJsonReference.on('value', gotData, errData);
});

function gotData(data) {

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

        myDataTemp.push(temperature);
        myDataHum.push(humidity);
        myTime.push(time);

        total.innerText = i;

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

function errData(err) {
    console.log('Error data');
    console.log(err);
}

function convert(unixtimestamp) {
    // Months array
    let months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Convert timestamp to milliseconds
    let date = new Date(unixtimestamp * 1000);
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