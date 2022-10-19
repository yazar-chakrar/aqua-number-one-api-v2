/*jshint esversion: 8*/
const express = require('express');
//Routes
const foods = require('../api/routes/foods');
const users = require('../api/routes/foods');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/foods', foods);
    app.use('/api/users', users);
};