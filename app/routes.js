/*jshint esversion: 8*/
const express = require('express');
//Routes
const foods = require('../api/routes/foods');
const users = require('../api/routes/users');
const auth = require('../api/routes/auth');
const orders = require('../api/routes/orders');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/foods', foods);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/orders', orders);
};