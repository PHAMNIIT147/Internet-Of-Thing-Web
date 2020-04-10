async function chartIt() {
    var ctx = document.getElementById('temperature').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Temperature', 'Humidity'],
            datasets: [{
                label: 'Dashboard enviroment',
                data: [40, 69],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
}

async function getData() {
    let database = firebase.database();

    const dataJsonReference = database.ref('DHT11').child('data');

    dataJsonReference.on('value', function(snapshot) {
        snapshot.forEach(function(data) {
            console.log(data.val().humidity);
            value.push(data.val().humidity);
            console.log(value)
        })
    });
}

$(function() {
    getData();
    chartIt();
});