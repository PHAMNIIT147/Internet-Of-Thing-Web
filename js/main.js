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

    database.ref().on("value", function(snapshot) {
        status = snapshot.val().status; //return null when listen is no data
        if (status == 1) {
            // changes clas of CSS
            $(".status-from-database").text("Worst");
            $(".lead").text("EMERGENCY ALRAM");
            console.error("The operating status of the device is worst");
        } else {
            $(".status-from-database").text("Best");
            $(".lead").text("The operating status of the device is normal")
        }
    });

    $(".status-button").click(function() {
        var firebaseReference = firebase.database().ref().child("status");

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