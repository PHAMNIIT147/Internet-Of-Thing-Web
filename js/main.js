var firebaseConfig = {
    apiKey: "AIzaSyBSh5-BpCcTAAACFIMnqsiBpe1btbgGnWM",
    authDomain: "pongcare-1575954397558.firebaseapp.com",
    databaseURL: "https://pongcare-1575954397558.firebaseio.com",
    projectId: "pongcare-1575954397558",
    storageBucket: "pongcare-1575954397558.appspot.com",
    messagingSenderId: "581812671119",
    appId: "1:581812671119:web:162be1d9bb4767fcccd6fa",
    measurementId: "G-75VEL53405"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



$(document).ready(function() {
    /**********************************************
     			PROGRANMMING FIREBASSE
    ************************************************/
    // Get a reference to the database service
    var database = firebase.database();
    //varibale global
    var status;
    var temperature;
    // create get element status
    var dataStatus = database.ref();
    //create image hangar

    const temperatureElement = document.getElementById('display-status-temperature');
    const hemuidityElement = document.getElementById('display-status-humidity');

    const temperatureReference = database.ref('dth11').child('temperature');
    const humidityReference = database.ref('dth11').child('humidity');



    /* test online */
    temperatureReference.on("value", function(temperatureSnapshot) {
        temperature = temperatureSnapshot.val();
        temperatureElement.innerText = temperature;
    });

    humidityReference.on("value", function(humiditySnapshot) {
        hemuidityElement.innerText = humiditySnapshot.val();
    });

    dataStatus.on("value", function(snapshot) {
        status = snapshot.val();
        if (status == 1 || temperature > 50) {
            // changes clas of CSS
            $(".status-from-database").text("Worst");
            $(".lead").text("EMERGENCY ALRAM");

            document.getElementById("status-color").style.color = "#ff0000";
            document.getElementById("display-status-temperature").style.color = "#ff0000";
            document.getElementById("infor-temperature").innerText = "The temperature inside the hangar is an increase";
            document.getElementById("status-hangar-image").innerHTML = "<img src='/fonts/icons/hangar-fire-icon.png' width='200' height='auto'>";

            console.log("status worst");
        } else if (status == 0 || temperature < 50) {
            $(".status-from-database").text("Best");
            $(".lead").text("The operating status of the hangar is best");

            document.getElementById("status-color").style.color = "#ffffff";
            document.getElementById("display-status-temperature").style.color = "#ffffff";
            document.getElementById("status-hangar-image").innerHTML = "<img src='/fonts/icons/hangar-stable-icon.png' width='200' height='auto'>";
            console.log("status best");
        }
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