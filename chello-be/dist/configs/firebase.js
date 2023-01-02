"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var app_1 = require("firebase/app");
var lite_1 = require("firebase/firestore/lite");
var firebaseConfig = {
    apiKey: "AIzaSyBu3Zcbw-hVwPHReVLFcGRNZ_459vAR8KY",
    authDomain: "chello-ba5d2.firebaseapp.com",
    projectId: "chello-ba5d2",
    storageBucket: "chello-ba5d2.appspot.com",
    messagingSenderId: "328005742126",
    appId: "1:328005742126:web:93765f3d40fee67b84f9bf"
};
var app = (0, app_1.initializeApp)(firebaseConfig);
var db = function () {
    (0, lite_1.getFirestore)(app);
    console.log('\nConnected to Firebase');
};
exports.db = db;
//# sourceMappingURL=firebase.js.map