const express = require('express')
const router = express.Router();
const Joi = require('joi');

var Mongoose=require("mongoose");
var ObjectId = Mongoose.Types.ObjectId;

const Orders = require('../../models/Orders');
const products = require('../../models/Products');
const Users = require('../../models/Users');

const auth = require('../../config/auth')

//-----------------------view my info------------------------------//  done
router.get('/viewMyInfo/:BID', auth, async(req, res)=> {

  const BuyerID=parseInt(req.params.BID);
  const by = await Users.findOne({_id:BuyerID})
  res.json(by)

});
//-----------------------update my info-----------------------------------//
router.put('/UpdateInfo/:BID', auth, async(req, res)=> {

  const BuyerID=parseInt(req.params.BID);
  const buyer= await Users.findOne({_id:BuyerID})

  const name = req.body.name
  const password = req.body.password
  const phoneNumber = req.body.phoneNumber
  const address = req.body.address
  const birthday = req.body.birthday


  const schema={
      name:Joi.string(),
      password:Joi.string(),
      phoneNumber:Joi.string(),
      address:Joi.string(),
   };
   const result=Joi.validate(req.body,schema)

   if(result.error)
    return res.status(400).send(error.details[0].message);
    
    if(name !== undefined ){

      Users.updateOne(
        { '_id': BuyerID},
        { $set: { "name": name } },
        function(err, model) {}
      );
       
    }

    if(password !== undefined ){

      Users.updateOne(
        { '_id': BuyerID},
        { $set: { "password": password } },
        function(err, model) {}
      );
       
    }

    if(phoneNumber !== undefined ){

      Users.updateOne(
        { '_id': BuyerID},
        { $set: { "phoneNumber": phoneNumber } },
        function(err, model) {}
      );
       
    }

    if(address !== undefined ){

      Users.updateOne(
        { '_id': BuyerID},
        { $set: { "address": address } },
        function(err, model) {}
      );
       
    }

    res.json("your info has been updated successfully")



});

//--------------------------viewOrders------------------------------//done
router.get('/viewAllOrders/:BID', auth, async(req, res)=> {

 
  const order = await Orders.find({approved:false})
  console.log(order)

   res.json(order)

});
//------------------------------------viewMyorders--------------------//done
router.get('/viewOrders/:SID', auth, async(req, res)=> {

  const StaffID=parseInt(req.params.SID);
  const order = await Orders.find({assignedStaffID:StaffID})

  if(order.length===0)
  res.json("");
  else{
      res.json(order);
  }

});

//---------------------------------Apply order-------------------------------// done
router.put("/chooseOrder/:BID/:oID", auth, async (req, res) => {
  var staffID = parseInt(req.params.BID);
  var order_ID = parseInt(req.params.oID);

  
    const order = await Orders.findOne({_id:order_ID});
    const applicants = order.applicants;
    const filtered = applicants.filter(r => r.staffID === staffID)
   console.log(filtered);
    if(filtered.length!== 0)
      res.json("you cannot apply twice");
   
      const approved = false;
      var newapplicants = order.applicants;
       const newapplicant = {
      staffID,
     approved,
  
     
    };
    newapplicants.push(newapplicant);
   const f = await Orders.findOneAndUpdate(
    {"_id":order_ID},
    {
      $set: {
        "applicants":newapplicants

      }
    }

  );
res.json(" you are an applicant now");

});


//---------------view reviews on complete orders------------------------//done
router.get("/viewReviews/:SID", auth, async (req, res) => {
    
  var staffID = parseInt(req.params.SID);
  const orders = await Orders.find({assignedStaffID:staffID});

    var reviews = [];

    for (var i = 0; i < orders.length; i++) {
     if(orders[i].orderTracking[2]===true)
     {
       const id = orders[i]._id;
       var review = orders[i].review;
       if(review==="")
           review = "you are still not reviewed";

      const newreview = {
         id,
       review,};
     reviews.push(newreview);
     }
    }
        res.json(reviews);


});


//---------------------------view order tracking of order------------------------//

//-----------------update order Tracking----------// done
router.put("/updateOnTheway/:sID/:oID", auth, async (req, res) => {
 const  staffID = parseInt(req.params.sID);
 const  orderID = parseInt(req.params.oID);
 const order = await Orders.findOne({_id:orderID});

 if(order.assignedStaffID===staffID && order.orderTracking[0]===true)
 {
const orderTracking =  order.orderTracking;
orderTracking[1] = true;
const f = await Orders.findOneAndUpdate({"_id":orderID,},{$set: { "orderTracking":orderTracking}});
res.json("you updated life cycle of your order");
   
 }
 else
   res.json("you can't update order tracking of order you aren't assigned to or order order you arenot assigned to");

});


//done
router.put("/updateOncomplete/:sID/:oID", auth, async (req, res) => {
  const  staffID = parseInt(req.params.sID);
  const  orderID = parseInt(req.params.oID);
  const order = await Orders.findOne({_id:orderID});

  if(order.assignedStaffID===staffID && order.orderTracking[0]===true&&order.orderTracking[1]===true )
  {
 const orderTracking =  order.orderTracking;
 orderTracking[2] = true;
 const f = await Orders.findOneAndUpdate({"_id":orderID,},{$set: { "orderTracking":orderTracking}});
 res.json("you updated life cycle of your order");
    
  }
  else
    res.json("you can't update order tracking of order you aren't assigned to or order order you arenot assigned to");
 
 });
 

module.exports = router
