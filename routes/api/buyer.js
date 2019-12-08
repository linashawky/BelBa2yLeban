const express = require('express')
const router = express.Router();
const Joi = require('joi');
var Mongoose=require("mongoose");
var ObjectId = Mongoose.Types.ObjectId;

const Orders = require('../../models/Orders');
const products = require('../../models/Products');
const auth = require('../../config/auth')

//-------------------view all products -----------------------//  done front
router.get('/viewProducts/:BID', auth, async(req, res)=> {
    const t = await product.find();
    res.json(t);

});

//-------------------------view a specific product---------------//  done front
router.get('/viewProduct/:BID/:PID', auth, async(req, res)=> {

    const ProductID = parseInt(req.params.PID);
    const product = await products.findOne({_id:ProductID})
    res.json(product);

});

//---------------- view products based on categories-----------// done front
router.get('/viewCategory/:BID/:Category', auth, async(req, res)=> {

    const cat =req.params.Category;
    const product = await products.find({productCategory:cat})
    res.json(product);

});

//--------------search for product name-----------//
router.post('/Productsearch/:BID', auth, async(req, res)=> {

  const pname =req.body.pname;
  const product = await products.find({productName:pname})
  if(product.length===0){
    res.json({data:" "})
  }
  res.json(product);

});

//------------------view my orders------------// done fornt 
router.get('/viewOrders/:BID', auth, async(req, res)=> {

    const BuyerID=parseInt(req.params.BID);
    const order = await Orders.find({buyerID:BuyerID})
    console.log(order)

    if(order.length===0)
    res.json("");
    else{
        res.json(order);
    }

});

//-----------------view previous orders--------// ???????????????
router.get('/viewPreviousOrders/:BID', auth, async(req, res)=> {

  const BuyerID=parseInt(req.params.BID);
  const order = await Orders.find({buyerID:BuyerID})
  console.log(order)
  var prevOrders = []

  for(var  i =0;i<order.length;i++){
     if(order[i].orderTracking[2]=== true)
      prevOrders.push(order[i])

  }

  res.json(prevOrders)



});

//-----------view specific order------------// ??????
router.get('/viewMyOrder/:OID', auth, async(req, res)=> {

  const OrderID=parseInt(req.params.OID);
  const order = await Orders.findOne({_id:OrderID})
  res.json(order);


});

//----------------rate and review an order -----------------//lesaaa
router.put('/ReviewandRate/:OID',auth, async(req,res)=>{

    const OrderID=parseInt(req.params.OID);
    const order=await Orders.findOne({_id:OrderID})

    const rate = req.body.rate
    const review = req.body.review 
       
        const schema = {
            rate: Joi.number().min(0).max(5).required(),
            review: Joi.string().required()
         };
      
        const result = Joi.validate(req.body, schema);
      
        if(result.error){
            return  res.send(result.error.details[0].message)
           }
      
        else {
        const orderDone = order.orderTracking[2]
      
        if(orderDone === true){
            order.rate = rate
            order.review = review
            Orders.updateOne(
              { '_id': OrderID},
              { $set: { "rate": rate,"review":review} },
              function(err, model) {}
            );
          return res.json("your review has been submitted ;)")


            return res.json("your rate and review has been submitted successfully");

        } 
        else{
          return res.json("you can't rate the service until it is done")
        }
      

      }
});

//-----------------view cart------------//  done front   
router.get('/viewCart/:BID', auth, async(req, res)=> {

  const BuyerID=parseInt(req.params.BID);
  const buyer = await Users.findOne({_id:BuyerID})
  if(buyer.shoppingCart.length===0){
    res.json("")
  }
  res.json(buyer.shoppingCart);


});
//------------------Add to cart----------------//  done front   
router.put('/AddtoCart/:BID/:PID', auth, async(req, res)=> {

  const BuyerID=req.params.BID;
  const ProductID=parseInt(req.params.PID);
  const myProd= await products.findOne({_id:ProductID})
  const buyer = await Users.findOne({_id:BuyerID})
  if(myProd.InStock===true){
  
    var orders1=buyer.shoppingCart;

    orders1.push(myProd);
    console.log(orders1);
  
    Users.updateOne(
        { '_id': BuyerID},
        { $set: { "shoppingCart": orders1
      } },
        function(err, model) {}
      );
    res.json("your order has been placed to your cart ;)")
  
    }
  
    else{
      res.json("Sorry...this product is out of stock")
    }
    
});

//--------delete from cart------------//  done front  
router.delete('/DeletefromCart/:BID/:PID', auth, async(req, res)=> {

  const BuyerID=parseInt(req.params.BID);
  const ProductID=parseInt(req.params.PID);
  const myProd= await products.findOne({_id:ProductID})
  const buyer= await Users.findOne({_id:BuyerID})
  if(buyer.shoppingCart.length>0){
  
    var orders1=buyer.shoppingCart;
    orders1.pop().myProd;
    console.log(orders1);
  
    Users.updateOne(
        { '_id': BuyerID},
        { $set: { "shoppingCart": orders1 } },
        function(err, model) {}
      );
    res.json("your order has been deleted from your cart ;)")
  
    }
  
    else{
      res.json("can't delete your cart is empty")
    }
    
});

//------------------place order----------------// done front  
router.post('/CreateOrder/:BID', auth, async(req, res)=> {

  const BuyerID=parseInt(req.params.BID);
  const buyer= await Users.findOne({_id:BuyerID})
  var cart=buyer.shoppingCart;
  var app=[]
  var addressb=buyer.address
  var assignedStaffID=-1;
  var rate=-1;
  var total=0;
  for(var i=0;i<cart.length;i++){
    total+=cart[i].productPrice;
  }
  var review="";
  const newOrder=new Orders( {
    approved:false,
    assignedStaffID:assignedStaffID,
    buyerID:BuyerID,
    orderTracking:[false,false,false],
    rate:rate,
    review:review,
    products:cart,
    applicants:app,
    address:addressb,
    totalPrice:total
  });

newOrder.save().catch(err => res.json({error:"error..try again later"}));

Users.updateOne(
    { '_id': BuyerID},
    { $set: { "shoppingCart": [] } },
    function(err, model) {}
  );

  res.json("your order has been placed")

 
});

//---------------------view order tracking-----------------// done front
router.get('/viewOrderTracking/:OID', async(req, res)=> {

  const OrderID=parseInt(req.params.OID);
  const order = await Orders.findOne({_id:OrderID})
  var track=order.orderTracking;
  var trackflag ="" ;
  console.log(track)
  //res.json(order)
  if(track[0]===false)
    res.json(0); 
else
  if(track[0]===true && track[1]===false && track[2]===false)
    res.json(1); 
  else
    if(track[0]===true && track[1]===true && track[2]===false)
    res.json(2); 
    else
      if(track[0]===true && track[1]===true && track[2]===true)
        res.json(3); 
    
  
  
});

//--------------------delete order------------------// done front
router.delete('/deleteOrder/:OID', auth, async(req, res)=> {

  const OrderID=parseInt(req.params.OID);
  const order = await Orders.findOne({_id:OrderID})
  if(order.orderTracking[0]===false){
  const order = await Orders.deleteOne({_id:OrderID})
  res.json("your order has been deleted")}
  else{
    res.json("order has already been approved and can't be deleted")
  }

});

//------------------view my info------------------// done front  
router.get('/viewMyInfo/:BID', auth, async(req, res)=> {

  const BuyerID=parseInt(req.params.BID);
  const by = await Users.findOne({_id:BuyerID})
  res.json(by)

});

//-----------update my info--------------// done front
router.put('/UpdateInfo/:BID', auth, async(req, res)=> {

  const BuyerID=parseInt(req.params.BID);

  const name = req.body.name
  const password = req.body.password
  const phoneNumber = req.body.phoneNumber
  const address = req.body.address
  //const birthday = req.body.birthday


  const schema={
      name:Joi.string(),
      password:Joi.string(),
     phoneNumber:Joi.string(),
      address:Joi.string(),
   };
   const result=Joi.validate(req.body,schema)

   if(result.error)
    return res.status(400).send(error.details[0].message);
    

    if(name !== " " ){

      Users.updateOne(
        { '_id': BuyerID},
        { $set: { "name": name } },
        function(err, model) {}
      );
       
    }

    if(password !== " " ){

    const updated_pass= await Users.updateOne(
        { '_id': BuyerID},
        { $set: { "password": password } },
        function(err, model) {}
      );
       
    }

    if(phoneNumber !== " " ){

      Users.updateOne(
        { '_id': BuyerID},
        { $set: { "phoneNumber": phoneNumber } },
        function(err, model) {}
      );
       
    }

    if(address !== " " ){

      Users.updateOne(
        { '_id': BuyerID},
        { $set: { "address": address } },
        function(err, model) {}
      );
       
    }
    
   res.json("your data was updated successfully")



});

//------------notification-----------------//
router.get('/Notify/:BID', auth, async(req,res)=>{
  const BuyerID=parseInt(req.params.BID);
  const buyer = await Users.findOne({_id:BuyerID})
  res.json(buyer.notifications)
});





module.exports = router
