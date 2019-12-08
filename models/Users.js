const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//to create an id that autoincrements each time a document is added
autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection( "mongodb+srv://Lina:cherry_liko1234@belba2yleban-tcjmm.mongodb.net/BelBa2yLeban?retryWrites=true&w=majority");
autoIncrement.initialize(connection);

const bcrypt = require('bcryptjs');
 
const User = new Schema({
  //attributes that all buyers have in common

 
  method:{
    type: String,
    enum: ['local', 'google'],
    required: true
  },
  //-----------------if user logged in locally ---------------------
    type: { type: String },
    name: { type: String },
    password: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    activation: { type: Boolean },
    address: { type: String },
    birthday: { type: Date },
    src: {type: String},
    updates: { type: Array },
    allRatings: { type: Array, items: { type: Number } },
    avgRating: { type: Number },
    busy: { type: Boolean },
    orders: { type: Array },
    notifications: {
      type: Array,
      items: [
        {
          notificationContent: { type: String, required: true },
          read: { type: Boolean, required: false }
        }
      ]
    },
  
    shoppingCart: {
      type: Array,
      items: [
        {
          products: {
            type: Array,
            required: true,
            items: [
              { productID: { type: Number, required: false } },
              { productName: { type: String, required: false } },
              { productDetails: { type: String, required: false } },
              { productCategory: { type: String, required: false } },
              { productPrice: { type: Number, required: false } }

            ]
          }
        }
      ]
    },
 
  //-----------------if user logged in with google------------------

    google:{
      id:{ type: String }
    }


});

User.pre('save', async function(next){
  try {
    if(this.method !== 'local'){
      next();
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(this.password, salt);

    this.password = passwordHash
    next();
    // console.log('salt:', salt);
    // console.log('normal password:' , this.password);
    // console.log('hashed password:', passwordHash);

  }catch(error){
    next(error);
  }
});

User.methods.isValidPassword = async function( newPassword) {
  try{
   return await bcrypt.compare(newPassword, this.password)
  }catch(error){
    throw new Error(error);
  }
}

User.plugin(autoIncrement.plugin, "User");
module.exports = Users = connection.model("User", User);
