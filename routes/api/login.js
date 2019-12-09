const express = require("express");
const router = require("express-promise-router")();

const { validateBody, schemas } = require("../../validations/validation");
const UsersController = require("../../controllers/users");

const passport = require("passport");
const passportConfig = require("../../passport");
const passportSignIn = passport.authenticate("local", { session: false });

const passportJWT = passport.authenticate("jwt", { session: false });
const passportGoogleStaff = passport.authenticate("googleTokenStaff", { session: false });
const passportGoogleBuyer = passport.authenticate("googleTokenBuyer", { session: false });

const jwt = require('jsonwebtoken')
const auth = require('../../config/auth');
const User = require('../../models/Users');
const tokenKey = require('../../config/jwtSecret').JWT_SECRET


router
  .route("/signup")
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router
  .route("/signin")
  .post(
    validateBody(schemas.signINSchema),
     passportSignIn,
    UsersController.signIn
  );
//-------------Create New User--------//
router.post("/googleLogin", async (req, res) => {
  const body = {
    name: req.body.name,
    email: req.body.email,
    password: "Not Needed",
    method: "google",
    notifications:[],
    orders:[],
    avgRating:0,
    busy: false,
    activation: false,
    type:"staff"
  };
 // console.log(req.body)
  const isValidated = validateBody(body.authSchema);
  if (isValidated.error) {
    console.log(isValidated.error.details[0].message);
    return res.status(400).send({
      msg: isValidated.error.details[0].message,
      error: "validation error"
    });
  }
 const user = await User.findOne({ email: body.email });

  if (!user) {
    
    const newUser = new User({
      name: body.name,
      email: body.email,
      password: body.password,
      method: "google",
      type:"staff",
  //    phoneNumber: phoneNumber,
  //    address: address,
      activation: false,
      updates:[],
      notifications:[],
      orders:[],
      shoppingCart:[],
      busy: false
    });
    await newUser.save();
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
    const token = jwt.sign(payload, tokenKey, { expiresIn: "24h" });
    res.json({ data: {token} });
    return res.json({ data: "Token"});
  } else {
    const type= user.type
    console.log(user)
   const id= user._id
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    const token = jwt.sign(payload, tokenKey, { expiresIn: "24h" });
    res.json({ data:token,userType:type,ID:id });
    return res.json({ data: "Token" ,userType:type,ID:id});
  }
});

router.route("/staff/oauth/google").post(passportGoogleStaff, UsersController.googleOAuth);
router.route("/buyer/oauth/google").post(passportGoogleBuyer, UsersController.googleOAuth);

router.route("/secret").get(passportJWT, UsersController.Secret);

router.get('/current',auth, (req,res)=>{

  res.json("access allowed")
})

module.exports = router;
