/*jshint esversion: 8*/
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const {Order, validate} = require('../models/order');
const route = express.Router();
const auth = require('../middleware/auth');
const { Food } = require('../models/food');

route.get('/', async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

route.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user.');

    const lines = req.body.lines;
    var t = [];
    for (var i in lines){ 
        const food = await Food.findById(lines[i].foodId);
        if (!food) return res.status(400).send('Invalid food on list.');
        t.push(
                {
                    name: food.name,
                    price: food.price,
                    quantity: lines[i].quantity
                }, //_.pick(food, ['name', 'price'])
        );
        
    }
    let order = new Order({
        user : _.pick(user, ['_id', 'phone']),
        lines: t,
        location: req.body.location
    });

    res.send(await order.save());
});

module.exports = route;