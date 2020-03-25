/**
 * @ Author: Pham Thanh Phong
 * @ Create Time: 2020-03-06 22:09:48
 * @ Modified by: Your name
 * @ Modified time: 2020-03-15 12:26:28
 * @ Description:
 */

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

    const temperatureReference = database.ref('dth11').child('temperature');
    const humidityReference = database.ref('dth11').child('humidity');

    dataStatus.on("value", function(snapshot) {
        status = snapshot.val();
        var refImage;
        var refColor;
        var refText;

        if (status == 1 || temperature > 50) {
            // changes clas of CSS
            $(".statusFromDatabase").text("Worst");
            $(".lead").text("EMERGENCY ALRAM");
            refText = "The temperature inside the hangar is an increase";
            refColor = "#ff0000";
            refImage = "<img src='fonts/icons/hangar-fire-icon.png' width='250' height='auto' >";
            console.log("status worst");
        } else if (status == 0 || temperature < 50) {
            $(".statusFromDatabase").text("Best");
            $(".lead").text("The operating status of the hangar is best");
            refColor = "#ffffff";
            refText = " The temperature inside the hangar is normal";
            refImage = "<img src='fonts/icons/hangar-stable-icon.png' width='250' height='auto'>";
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


    $(".status-button").click(function() {
        var firebaseReference = dataStatus.child("status");

        //toggle
        if (status == 1) {
            firebaseReference.set(0);
            status = 0;
        } else {
            firebaseReference.set(1);
            status = 1;
        }
    });
});