var Hospital = require('../models/hospital.model');

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
	Hospital.find().exec(function (err, hospitalList){
		if (err){return next(err);}
		console.log(hospitalList);
		res.render('hospitalList',{title: 'All hospitals', hospitalList: hospitalList});
	});
}
