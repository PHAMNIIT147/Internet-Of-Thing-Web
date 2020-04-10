async function chartIt() {
    const data = await getData();
    var ctx = document.getElementById('enviroment').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [{
                label: 'Global Average Temperature from NASA',
                data: data.ys,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return '$' + value;
                        }
                    }
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Year'
                    }
                }]
            }
        }
    });
}

async function getData() {
    var xs = [];
    var ys = [];

    const respone = await fetch('data/ZonAnn.Ts+dSST.csv');
    const data = await respone.text();
    console.log(data);

    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const column = row.split(',');
        const year = column[0];
        xs.push(year);
        const temp = column[1];
        ys.push(parseFloat(temp) + 14);
        console.log(year, temp);
    });
    return { xs, ys };
}

$(function() {
    feather.replace();

    chartIt();
});