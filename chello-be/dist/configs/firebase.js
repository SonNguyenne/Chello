"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var app_1 = require("firebase/app");
var lite_1 = require("firebase/firestore/lite");
var firebaseConfig = {
    apiKey: "AIzaSyB63Q5bZ1eTCD2Lu9QTuL8Wd9Z58awOkXA",
    authDomain: "chello-data.firebaseapp.com",
    projectId: "chello-data",
    storageBucket: "chello-data.appspot.com",
    messagingSenderId: "987726040037",
    appId: "1:987726040037:web:b417faef2db4c6350ebd0c",
};
var app = (0, app_1.initializeApp)(firebaseConfig);
var db = function () {
    try {
        (0, lite_1.getFirestore)(app);
        console.log("\nConnected to Firebase");
    }
    catch (e) {
        console.log("Cannot connect to Firebase");
        return;
    }
};
exports.db = db;
//# sourceMappingURL=firebase.js.map