var express = require('express');
var Firebase = require('firebase');

var fbRef = Firebase.initializeApp({
    authDomain: 'https://games-77885.firebaseapp.com/',
    apiKey: 'AIzaSyCtmKW30dSrNtC25SMAjU15B7CZI97gQEk'
});
module.export = fbRef;