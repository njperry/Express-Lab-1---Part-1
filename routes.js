"use strict";
const express = require("express");
// const cartitems = require("./cart-items");
const router = express.Router();
const pool = require("./pg-connection-pool");

console.log(pool);

function selectAll(res) {
    pool
    .query("select * from shoppingcart order by id")
    //    .query("select * from cartitems order by id") //returns us a promise -> uses order by id to always list them in order even after editing 
       .then(result => res.json(result.rows)); //added last after console.log statement below //gets info our request is calling
       //take the result query and send off that table to the front end
       // .then(result => console.log(result.rows)); //  use .then or .catch to get an argument and console log it to check it works
   };

router.get("/cartitems", (req, res) => {
    selectAll(res);
});

router.post("/cartitems", (req, res) => { //add method
    pool
        .query("insert into shoppingcart (product, price, quantity) values ($1::text, $2::int, $3::int)", [
            req.body.product,
            req.body.price,
            req.body.quantity
        ]).then(() => {
            selectAll(res);
        });
    
    // console.log(req.body);
    // animalList.push(req.body);
    // res.json(animalList);
});

// router.delete("/cartitems/:id", (req, res) => { //:index is known as a URI parameter
//     for (let i = 0; i <= cartitems.length; i++) {
//         if (cartitems[i].id == req.params.id) {
//             cartitems.splice(i, 1);
//             res.json(cartitems);
//             break;
//         }
//     }
// });

router.delete("/cartitems/:id", (req, res) => {
    pool
    .query("delete from shoppingcart where id=$1::int;", 
    [Number(req.params.id)])
    .then(() => {
        selectAll(res);
    });

    // console.log(req.params.name);
    // // animalList.splice(req.params.name, 1);
    // animalList.splice(animalList.findIndex(element => element.name === req.params.name), 1)
    // res.json(animalList);
});

router.put("/cartitems/:id", (req, res) => { //updating
    pool
    .query("update shoppingcart set product=$1::text, price=$2::int, quantity=$3::int where id=$4::int", [
        req.body.product,
        req.body.price,
        req.body.quantity,
        Number(req.params.id)
    ]).then(() => {
        selectAll(res);
    });
    
    // console.log(req.body);
    // console.log(req.params.name);
    // animalList.splice(animalList.findIndex(element => element.name === req.params.name), 1, req.body);
    // res.json(animalList);
})



// // this condenses the above method from before
// router.post("/cartitems", (req, res) => { //built in method for adding things 
//     console.log(req.body);
//     cartitems.push(req.body);
//     res.json(cartitems);
// });

// // router.put("/cartitems/:id", (req, res) => {
// //     console.log(req.body);
// //     cartitems.splice(cartitems.findIndex(element => element.id === req.params.id), 1, req.body)
// //     res.json(cartitems);
// //     console.log(req.body.id);
// //  });

// router.put("/cartitems/:id", (req, res) => {
//     for (let i = 0; i <= cartitems.length; i++) {
//         if (cartitems[i].id == req.params.id) {
//             cartitems.splice(i, 1, req.body);
//             res.json(cartitems);
//             break;
//         }
//     }
// });

module.exports = router;