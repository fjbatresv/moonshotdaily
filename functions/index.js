/*
* Author = FJBatresV
* Year = 2018
* Project = MoonShotDaily
*/
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.newUser = functions.auth.user().onCreate(event => {
    const user = event.data;
    admin.database().ref('users/' + user.uid ).set(user);
});
