$(function() {
    let database = firebase.database();

    let ref = database.ref('WSN2');
    ref.on('value', parkingData, errDara);
});

function parkingData(data) {
    let record = data.val()
    console.log(record);
    if ((record.parking1) > 20 && (record.parking1) < 30) {
        document.getElementById('slot1').innerHTML = "<img src='static/images/hangar/plane.png' alt='plane' width='400'>";
    } else if ((record.parking1) < 20) {
        document.getElementById('slot1').innerText = "Error Sensor!"
    } else if ((record.parking1) > 30) {
        document.getElementById('slot1').innerText = "NULL";
    }
}

function errDara(err) {
    console.log(err);
}