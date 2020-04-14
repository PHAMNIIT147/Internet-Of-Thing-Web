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
    const firebaseConfig = {
        apiKey: "AIzaSyAZbCWXwgO5d2RfTVox5zFtdHbueqH7cJs",
        authDomain: "zipi-iot.firebaseapp.com",
        databaseURL: "https://zipi-iot.firebaseio.com",
        projectId: "zipi-iot",
        storageBucket: "zipi-iot.appspot.com",
        messagingSenderId: "169193769529",
        appId: "1:169193769529:web:7f50216274175c2a1f9be8",
        measurementId: "G-EBS5WW78GZ"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    appFirebase = firebase;

    /*
     * query open source feather 
     */
    feather.replace();
});