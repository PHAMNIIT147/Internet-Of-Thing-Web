/* variable global */
$(function() {
    const database = firebase.database();

    const dataJsonReference = database.ref('DHT11').child('data');

    dataJsonReference.on('value', getData, errData);

});

function getData(data) {
    const datas = data.val();
    const keys = Object.keys(datas);
    for (let i = 0; i < keys.length; i++) {

        let k = keys[i];

        let name = datas[k].name;

        let humidity = datas[k].humidity;

        let temperature = datas[k].temperature;

        let celsius = getCelsius(temperature);
        let fahremheit = getFahremheit(temperature);
    }
}

function errData(err) {
    console.log('Error!');
    console.log(err);
}

function getCelsius(object) {
    return object.celsius;
}

function getFahremheit(object) {
    return object.fahremheit;
}