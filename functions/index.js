/*
* Author = FJBatresV
* Year = 2018
* Project = MoonShotDaily
*/
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.newUser = functions.auth.user().onCreate((userMetadata, context) => {
    console.log('user', userMetadata);
    return admin.database().ref('user/' + userMetadata.uid).set({
        uid: userMetadata.uid
    });
});

exports.createShot = functions.https.onRequest((req, res) => {
   return admin.database().ref('problems').once('value').then((datasnapshot) => {
        var problems = [];
        datasnapshot.forEach((child) => {
            problems.push(child.key);
        });
        return admin.database().ref('tech').once('value').then((snapshot) => {
            var techs = [];
            snapshot.forEach((child) => {
                techs.push(child.key);
            });
            var date = new Date();
            date.setHours(0, 0, 0, 0);
            return admin.database().ref('moonshot/').push({
                tech: techs.randomElement(),
                problem: problems.randomElement(),
                time: date.getTime()
            });
        }).catch((ex) => {
            console.log(ex);
            return;
        });
    }).catch((ex) => {
        console.log(ex);
        return;
    });
});

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}