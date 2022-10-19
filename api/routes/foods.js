/*jshint esversion: 8*/
const express = require('express');
const route = express.Router();
const {Food, validate} = require('../models/food');

route.get('/', async (req, res) =>{
    const foods = await Food.find().sort('category');
    res.send(foods);
});

route.post('/', async (req, res) =>{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let food = new Food({
        name: req.body.name,
        discription: req.body.discription,
        category: req.body.category,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        isAvaible: req.body.isAvaible,
    });

    food = await food.save();
    res.send(food);
});

route.put('/:id', async(req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const food = await Food.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            discription: req.body.discription,
            category: req.body.category,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            isAvaible: req.body.isAvaible,
        },
        {
            new: true
        }
    );
    if (!food) return res.status(404).send('The food with given id wasn t found');
    res.send(food);
});

route.delete('/:id', async(req, res) => {
    const food = await Food.findByIdAndRemove(req.params.id);
    if (!food) return res.status(404).send('The food with given id wasn t found');
    res.send(food);
});

route.get('/:id', async(req, res) => {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).send('The food with given id wasn t found');
    res.send(food);
});

module.exports = route;