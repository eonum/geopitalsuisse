var Hospital = require('../models/hospital.model');
var Address = require('../models/address.model');

var async = require('async');

exports.index = function(req, res){
	async.parallel({
		hospitalCount: function(callback){
			Hospital.count(callback)
			},
		},
		function(err, results){
			res.render('index', { title: 'Geopital Suisse Management', error: err, data: results});
	});
};

exports.hospitalList = function(req, res){
	Hospital.find().populate('address').exec(function (err, hospitalList){
		if (err){return next(err);}
		console.log(hospitalList);
		res.render('hospitalList',{title: 'All hospitals', hospitalList: hospitalList});
	});
}
exports.addressList= function(req, res){
	Address.find().exec(function(err, addressList){
		if (err){return next(err);}
		console.log(addressList);
		res.render('addressList', {title: 'All addresses', addressList: addressList});
	});
}
