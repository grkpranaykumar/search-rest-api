const express = require('express');
const mongoose = require("mongoose");
const Property = require('.../models/propertyModel');
//var Property = mongoose.model("Property");

var propertyController = {};

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


propertyController.show = function(req, res, next){
	//console.log("inQuery",req.query.search);
	if(req.query.search) {
		//console.log(req.body);
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Property.find({"name": regex},function(err, property_data){
				if(err) {
					req.flash('error', err.message);
					res.redirect('back');
				}
				if(property_data.length < 1) {
				//	req.flash('error', "Sorry no properties found by that search.");
					res.send(property_data);
				}
				else{
					res.send(property_data);
				}
		});
	}
};

propertyController.save = function(req,res,next){
  Property.create(req.body).then(function(err,data){
		if(err) throw err;
    res.send(data);
  }).catch(next);
};

module.exports = propertyController;
