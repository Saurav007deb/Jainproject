const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')

router.post('/Orderdata', async (req, res) => {
    try {
        let data = req.body.order_data;
        data.splice(0, 0, { Order_date: req.body.order_date });

        console.log(`Querying for email: ${req.body.email}`);
        
       
        let eId = await Order.findOne({ 'email': req.body.email });

        if (eId === null) {
            console.log('Email not found, creating new order');
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.status(200).json({ success: true });
        } else {
            console.log('Email found, updating order data');
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: "Server Error", message: error.message });
    }
});


router.post('/myParticipitation', async (req, res) => {
    try {
        
        let myData =  await Order.findOne({'email': req.body.email});
        res.json({ MypartData : myData })
       
    } catch (error) {
        
        res.status(500).json({ error: "Server Error", message: error.message });
    }
});



module.exports = router;