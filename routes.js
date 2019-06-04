"use strict";
const express = require("express");
const cartitems = require("./cart-items");
const router = express.Router();

router.get("/cartitems", (req, res) => {
    res.json(cartitems);
    console.log(cartitems);
});

router.delete("/cartitems/:id", (req, res) => { //:index is known as a URI parameter
    for (let i = 0; i <= cartitems.length; i++) {
        if (cartitems[i].id == req.params.id) {
            cartitems.splice(i, 1);
            res.json(cartitems);
            break;
        }
    }
});

// this condenses the above method from before
router.post("/cartitems", (req, res) => { //built in method for adding things 
    console.log(req.body);
    cartitems.push(req.body);
    res.json(cartitems);
});

// router.put("/cartitems/:id", (req, res) => {
//     console.log(req.body);
//     cartitems.splice(cartitems.findIndex(element => element.id === req.params.id), 1, req.body)
//     res.json(cartitems);
//     console.log(req.body.id);
//  });

router.put("/cartitems/:id", (req, res) => {
    for (let i = 0; i <= cartitems.length; i++) {
        if (cartitems[i].id == req.params.id) {
            cartitems.splice(i, 1, req.body);
            res.json(cartitems);
            break;
        }
    }
});

module.exports = router;