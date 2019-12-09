const express = require("express");
const router = express.Router();
const Joi = require("joi");
var Mongoose = require("mongoose");
var ObjectId = Mongoose.Types.ObjectId;
const user = require("../../models/Users");
const product = require("../../models/Products");
const orders = require("../../models/Orders");

//---------------------- view all products------------------------//
router.get("/viewProducts", async (req, res) => {
  const t = await product.find();
  res.json(t);
});

//---------------------- create new product------------------------//
router.post("/createNewProduct", async (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const details = req.body.details;
  const stock = req.body.stock;
  const imagesrc = req.body.imagesrc;
  const productPrice=req.body.productPrice;
  const InStockk = true;
  
  const schema = {
    name: Joi.string().required(),
    category: Joi.string().required(),
    details: Joi.string().required(),
    stock: Joi.number().required(),
    imagesrc: Joi.string().required(),
    productPrice: Joi.number().required()
  };
  const result = Joi.validate(req.body, schema);
  console.log(imagesrc)

  if (result.error) return res.status(400).send(error.details[0].message);

  const newProduct = new product({
    productName: name,
    productDetails: details,
    productCategory: category,
    Stock: stock,
    src: imagesrc+".jpg",
    price: productPrice,
    InStock:InStockk

  });



  newProduct
    .save()
    .then(product => res.json("Successful upload ;)" ))
    .catch(err => res.json( "error product not created" ));
});



module.exports = router;
