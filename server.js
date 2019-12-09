//--------------------express--------------------
const express = require('express');
const app = express();
const nodemailer = require("nodemailer");

//--------------------cors---------------
const cors = require('cors')

//--------------------api--------------------
const admin = require('./routes/api/admin');
const buyer = require('./routes/api/buyer');
const staff = require('./routes/api/staff');
const login = require('./routes/api/login');

var Mongoose = require("mongoose");
var ObjectId = Mongoose.Types.ObjectId;

const users = require("./models/Users")
const product = require("./models/Products");
const orders = require("./models/Orders");



//--------------------Mongoose + DB configuration--------------------
var mongoose = require('mongoose');
const db = require('./config/keys_dev').mongoURI;

// Connect to mongo
mongoose
 .connect(db)
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.log(err));

//--------------------Init middleware--------------------
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//-----------------cors---------------
app.use(cors());

//--------------------Home Page--------------------
app.get('/', (req, res) => {
res.send(`<h1>Home page</h1>
<p> REGISTER OR SIGN UP <p>
<a href="/api/admin">Admin</a>
<a href="/api/staff">Staff</a>
<a href="/api/buyer">Buyer</a>
`);

})

//--------------------Direct routes to appropriate files-------------------- 
app.use('/api/buyer', buyer);
app.use('/api/admin', admin);
app.use('/api/staff', staff);
app.use("/api/login", login)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
  //-------------allow server to take data from body-----------------//

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept'
    )
    next()
  })
//--------------------Handling Error 404--------------------
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 });

 //--------------------Server--------------------
 const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));


//=================================================================//
//---------------------- activate accounts-------------------------//

async function ActivateAccounts (){
  const user = await users.find();
  user.forEach(element => {
    if(element.activation === false){
     const ID = element._id;
     const activate = true;
     const name = element.name;
     const email = element.email;
   
     users.updateOne(
       { _id: ID },
       { $set: { activation: activate, signedIn: true } },
       function(err, model) {}
     );

     console.log("account activated successfully");

   console.log(email);
   console.log(name)
     const message = `Hi ${name}! 
                         Your account with BelBa2yLeban has been successfully activated.
                         Welcome to our family ^-^`;
   
     sendMailToUsers(
       email,
       "Urgent! BelBa2yLeban Account Activation",
       message,
       function(err, data) {
         if (err) {
           res.json(err);
         } else {
           res.json("email sent successfully");
           console.log("email sent successfully");
         }
       }
     );

    }
  });

}
ActivateAccounts()

//----------------------notification with Mail--------------------//
function sendMailToUsers(recieverEmail, subjectff, textxxx) {
 const subjectttt = subjectff;
 const textggg = textxxx;

 let transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
     user: "belba2yleban@gmail.com",
     pass: "leban_1234"
   },
   tls: {
     rejectUnauthorized: false
   }
 });

 let mailOptions = {
   from: "belba2yleban@gmail.com",
   to: recieverEmail,
   subject: subjectttt,
   text: textggg
 };
 transporter.sendMail(mailOptions, function(error, info) {
   if (error) {
     console.log(error);
     console.log("something went wrong please try again later ");
   } else {
     console.log(recieverEmail);
     console.log("email sent successfully");
   }
 });
}

//------------------send push notification to users-------------//
async function notify(senderIDs, Id, content) {
 //==== if notification sent from admin===//

 if (senderIDs === "") {
   const senderName = "BelBa2yLeban";
   const ID = ObjectId(Id);
   const user = await users.findOne(ID);
   if (user === null) {
     console.log("the database has no partner with the given ID");
   } else {
     const notificationContent = content;
     const read = false;

     newNotification = {
       senderName,
       notificationContent,
       read
     };
     await users.updateOne(
       { _id: ID },
       { $push: { notifications: newNotification } },
       function(err, model) {}
     );

     const user2 = await users.findOne({ _id: ID });
     const not2 = user2.notifications;
     console.log(not2);
   }
 }

   //==== if notification does not include the admin===//
   else {
     const senderID = ObjectId(senderIDs);
     const sender = await users.findOne(senderID);
     const senderName = sender.name;
     const ID = ObjectId(Id);
     const user = await users.findOne(ID);
     if (user === null) {
       console.log("the database has no buyer/staff with the given ID");
     } else {
       const notificationContent = content;
       const read = false;

       newNotification = {
         senderName,
         notificationContent,
         read
       };
       await users.updateOne(
         { _id: ID },
         { $push: { notifications: newNotification } },
         function(err, model) {}
       );

       const user2 = await users.findOne({ _id: ID });
       const not2 = user2.notifications;
       console.log(not2);
     }
   }
 
}

// notify(sender id,  reciever id , message)
// //-------for notifying the admin --> reciever id--> ""


//---------------assign an applicant for the order---------------//
async function AssignApplicant() {
 const flag = false;
 const orderss = await orders.find();

 orderss.forEach(async element => {
   const ID = element._id;
   const buyerId = element.buyerID
   const buyer = await users.findOne({_id: buyerId})
   const buyerName = buyer.name
   const buyerEmail = buyer.email
   console.log("name: " , buyerName)


   if (element.approved === true) {
     console.log(
       "order number:",
       element._id,
       "has already been applied to a staff"
     );
   } else {
     const applicants = element.applicants;
     console.log(applicants, " BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ");
     if (applicants === undefined || applicants === []) {
       console.log("order number:", element._id, "has no applicants yet");

     } else {
       applicants.forEach(async element2 => {
         const applicant = element2.staffID;
         const staff = await users.findOne({ _id: applicant });
         const isStaffBusy = staff.busy;
         const staffEmail = staff.email;
         const staffName = staff.name;

         if (flag === false && isStaffBusy === false) {
           await orders.findOneAndUpdate(
             { _id: ID },
             {
               $set: {
                 approved: true,
                 "applicants.$[i].approved": true,
                  assignedStaffID: staff,
                 "orderTracking.0": true
               }
             },
             { arrayFilters: [{ i: element2 }] }
           );

           const orderToAdd = await orders.findOne({ _id: ID });
           // console.log(orderToAdd);
           await users.findOneAndUpdate(
             { _id: staff },
             { $push: { orders: orderToAdd } }
           );
           await users.findOneAndUpdate(
             { _id: staff },
             { $set: { busy: true } }
           );

           const x = await orders.findOne({ _id: ID });
           //console.log(x)
           const u = await users.findOne({ _id: applicant });
           notify( "", applicant, `Hi ${staffName}!! you was assigned to ${buyerName}'s order`)
           notify( "", buyerId, `your order was assigned to ${staffName}`)

           sendMailToUsers(buyerEmail, "BelBa2yLeban Delivery", ` ${staffName} was assigned to your order ^.^ `)
           sendMailToUsers(staffEmail, "BelBa2yLeban Delivery", `you was was assigned to ${buyerName}'s order ^.^ `)

         } else {
           console.log();
         }
       });
     }
   }
 });
}
AssignApplicant();

//---------------update inStock products--------------------------//
async function UpdateProducts(productsToUpdate) {
 const products = await product.find();
 productsToUpdate.forEach(async element =>{
   products.forEach(async elements => {
       if (element._id === elements._id){
           const newStock = parseInt(elements.Stock)-1
           if(newStock <= 0){
               console.log("ouuuuuuuutttt")
               await product.findOneAndUpdate(
                   {"_id": element._id},
                   {$set: {"Stock": 0,"InStock": false}}
               );  
           }else{
               console.log("newStock of:",element._id,"--->>>>", newStock)
               await product.findOneAndUpdate(
                   {"_id": element._id},
                   {$set: {"Stock": newStock, "InStock":true}}
               );
           }
       }

   });
 });

}

async function getOrders(){
   const orderss = await orders.find();
   orderss.forEach(async element => {
       if(element.orderTracking[0] === true && element.orderTracking[1] === true && element.orderTracking[2]=== false && element.orderReady === false){
           const prod = element.products
           //console.log(prod)
           UpdateProducts(prod)
           const ID = element._id
           await orders.findOneAndUpdate(
            { _id: ID },
            { $set: { orderReady: true }  });
       }
   })
}

getOrders()
