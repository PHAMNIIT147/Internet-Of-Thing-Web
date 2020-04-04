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
    fire: "<img src='fonts/icons/hangar-fire-icon.png' width='250' height='auto'>",
    normal: "<img src='fonts/icons/hangar-stable-icon.png' width='150' height='auto'>"
};

const statusAlarmHangar = {
    worst: "The temperature inside the hangar is an worst",
    best: "The temperature inside the hangar is normal"
};

function displayTextStatus(text) {
    document.getElementById("inforTemperature").innerText = text;
}

function changeColorStatus(color) {
    document.getElementById("statusColor").style.color = color;
    document.getElementById("displayStatusTemperature").style.color = color;
}

function displayImageStatus(refImage) {
    document.getElementById("statusHangarImage").innerHTML = refImage;
}




$(function() {
    /*
     * query open source feather 
     */
    feather.replace();
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


    const temperatureElement = document.getElementById('displayStatusTemperature');
    const hemuidityElement = document.getElementById('displayStatusHumidity');
    const buttonLight = document.getElementById('light');

    const temperatureReference = database.ref('dth11').child('temperature');
    const humidityReference = database.ref('dth11').child('humidity');

    dataStatus.on("value", function() {

        var refImage;
        var refColor;
        var refText;

        if (temperature > 50) {
            // changes clas of CSS
            $(".statusFromDatabase").text("Worst");
            $(".lead").text("EMERGENCY");

            refText = statusAlarmHangar.worst;
            refColor = "#ff0000";
            refImage = imageStatusHangar.fire;

            console.log("status worst");
        } else if (temperature < 50) {
            $(".statusFromDatabase").text("Best");

            refColor = "#ffffff";
            refText = statusAlarmHangar.best;
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
        temperatureElement.innerText = temperature;
    });

    humidityReference.on("value", function(humiditySnapshot) {
        hemuidityElement.innerText = humiditySnapshot.val();
    });

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