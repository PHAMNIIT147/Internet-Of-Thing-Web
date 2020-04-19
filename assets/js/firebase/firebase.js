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
        apiKey: "AIzaSyDgkKeQntDxsqwdgf1tfp9E9cOWQWT08RQ",
        authDomain: "zipi-iot-aa1c7.firebaseapp.com",
        databaseURL: "https://zipi-iot-aa1c7.firebaseio.com",
        projectId: "zipi-iot-aa1c7",
        storageBucket: "zipi-iot-aa1c7.appspot.com",
        messagingSenderId: "1079705391061",
        appId: "1:1079705391061:web:b2d4c51c4b835fd415375c"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    appFirebase = firebase;

    /*
     * query open source feather 
     */
    feather.replace();
});