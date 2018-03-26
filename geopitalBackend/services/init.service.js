#!/usr/bin/env node

var mongoose = require('mongoose');
var bluebird = require('bluebird');

var dataService = require('../services/upload.service');

var Hospital = require('../models/hospital.model');
var Address = require('../models/address.model');
var Coordinates = require('../models/coordinates.model');

mongoose.Promise = bluebird;

exports.connectToDatabase = async function(){
  mongoose.connect('mongodb://127.0.0.1:27017/geopital-backend')
    .then(()=> {
      console.log(`Succesfully Connected to the Mongodb Database at URL : mongodb://127.0.0.1:27017/geopital-backend. Start cleaning up!`)
    })
    .catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/geopital-backend`)})
};

exports.terminateConnection = async function(){
    mongoose.connection.close().then(console.log('Terminated connection'));
}
console.log("Hi");
