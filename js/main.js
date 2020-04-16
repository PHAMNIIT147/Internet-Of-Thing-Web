/**
 * @ Author: Pham Thanh Phong
 * @ Create Time: 2020-03-06 22:09:48
 * @ Modified by: Your name
 * @ Modified time: 2020-03-15 12:26:28
 * @ Description:
 */

/* *******************************
configuration object inside Hangar
********************************** */
const imageStatusHangar = {
    fire: "<img src='assets/images/hangar/hangar-fire-icon.png' width='150' height='auto'>",
    normal: "<img src='assets/images/hangar/hangar-stable-icon.png' width='150' height='auto'>"
};


$(function() {
    /**********************************************
 			PROGRANMMING CONFIGURATION
    ************************************************/
    // Get a reference to the database service
    var database = firebase.database();
    //varibale global
    var status;
    var temperature;
    // create get element status
    var dataStatus = database.ref();
    //create image hangar


    const temperatureElement = document.getElementById('Temperature');
    const hemuidityElement = document.getElementById('Humidity');
    const buttonLight = document.getElementById('light');

    /* path JSON in database */
    const sensorReference = database.ref('DHT11');

    const humidityReference = sensorReference.child('Humidity');
    const temperatureReference = sensorReference.child('Temperature');

    const timeReference = sensorReference.child('Time');

    dataStatus.on("value", function() {

        var refImage;
        var refColor;
        var refText;

        if (temperature > 35) {
            // changes clas of CSS
            $(".Status").text("Worst");
            $(".lead").text("EMERGENCY");
            ``

            refColor = "#ff0000";
            refImage = imageStatusHangar.fire;

            console.log("status worst");
        } else if (temperature <= 35) {
            $(".Status").text("Best");

            refColor = "#ffffff";
            refImage = imageStatusHangar.normal;

            console.log("status best");
        }

        displayImageStatus(refImage);
        changeColorStatus(refColor);
        displayTextStatus(refText);
    });

    /* test online */
    temperatureReference.on("value", function(temperatureSnapshot) {
        temperature = temperatureSnapshot.val();
        temperatureElement.innerText = parseInt(temperature);
    });

    humidityReference.on("value", function(humiditySnapshot) {
        hemuidityElement.innerText = humiditySnapshot.val();
    });


    startTime();

    var firebaseReference = dataStatus.child("light");
    $(".status-button").click(function() {
        //toggle
        if (status == 1) {
            firebaseReference.set(0);
            status = 0;

            buttonLight.style.backgroundColor = "#ff0000";
            console.log('light is on');

        } else {
            firebaseReference.set(1);
            status = 1;

            buttonLight.style.backgroundColor = "#323232";
            console.log('light is off');
        }
    });
});

function displayTextStatus(text) {
    document.getElementById("inforTemperature").innerText = text;
}

function changeColorStatus(color) {
    document.getElementById("statusColor").style.color = color;
    document.getElementById("displayStatusTemperature").style.color = color;
    document.getElementById("ColorTemperature").style.color = color;
}

function displayImageStatus(refImage) {
    document.getElementById("HangarImage").innerHTML = refImage;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('TimeZone').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
    return i;
}