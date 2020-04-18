const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const database = admin.database();
/* const DialogflowApp = require('actions-on-google').DialogflowApp; */

exports.receiveAssistantRequests = functions.https.onRequest((request, response) => {

    /*     const app = new DialogflowApp({ request: request, response: response });

        function handlerRequest(app) {

            const device = app.getArgument('devices');
            const status = app.getArgument('status');

            return admin.database().ref(`/automation/${device}/value`).set(status)
                .then(snapshot => {
                    app.ask(`Ok, switching ${device} ${status}. Do you want to control anything else?`);
                });

        }
        app.handleRequest(handlerRequest); */
    let params = request.body.result.parameters;
    database.ref('automation/light').set(params);
});