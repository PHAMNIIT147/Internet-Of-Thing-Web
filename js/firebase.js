/**
 * @ Author: Pham Thanh Phong
 * @ Create Time: 2020-03-15 10:58:32
 * @ Modified by: Your name
 * @ Modified time: 2020-03-15 11:00:18
 * @ Description:
 */

/* create firebase global */
var appFirebase = {};
$(function() {
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

    var appFirebase = firebase;
});