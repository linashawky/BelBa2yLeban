const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//to create an id that autoincrements each time a document is added
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb+srv://Lina:cherry_liko1234@belba2yleban-tcjmm.mongodb.net/BelBa2yLeban?retryWrites=true&w=majority")
autoIncrement.initialize(connection);
// Create the schema

const products = new Schema({
   productName:{type:String,required:true},
   productDetails:{type:String,required:true},
   productCategory:{type:String,required:true},
   Stock:{type:Number,required:true},
   InStock:{type:Boolean},
   src:{type:String},
   productPrice:{type:Number}
});

products.plugin(autoIncrement.plugin,'products');
module.exports = product = connection.model('products', products);
