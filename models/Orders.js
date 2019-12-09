const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//to create an id that autoincrements each time a document is added
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb+srv://Lina:cherry_liko1234@belba2yleban-tcjmm.mongodb.net/BelBa2yLeban?retryWrites=true&w=majority")
autoIncrement.initialize(connection);
// Create the schema

const orders = new Schema({
 
                orderID:{ type:Number},
                buyerID:{type:Number},
                approved:{type:Boolean,required:false},
                assignedStaffID:{type:Number,required:false},
                orderTracking:{type: Array, "items":{ type: Boolean}},
                orderReady:{type:Boolean,required:false},
                rate:{type: Number},
                review:{type:String},
                address:{type:String},
                totalPrice:{type:Number},
                products:{type: Array,required:true,
                    "items":[
                       {productID: {type:Number,required:false}},
                       {productName:{type:String,required:false}},
                       {productDetails:{type:String,required:false}},
                       {productCategory:{type:String,required:false}}, 
                       {productPrice:{type:Number,required:false}}
                    ]
                },
                applicants:{
                    type:Array,
                    "items":[{
                        applicantID:{type:Number,required:true} , 
                        accepted:{type:Boolean,required:false},
                       }
                    ]}           
});

orders.plugin(autoIncrement.plugin,'orders');
module.exports = order = connection.model('orders', orders);
