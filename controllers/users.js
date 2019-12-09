const JWT = require("jsonwebtoken");
const User = require("../models/Users");
const { JWT_SECRET } = require("../config/jwtSecret");
const jwtDecode =require('jwt-decode');

signToken = user => {
  // sign( payload , secret )
  return JWT.sign(
    {
      iss: "belba2yleban",
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1) // the token expire after 1 day
    },
    JWT_SECRET
  );
};

module.exports = {
  //-----------------------------------sign Up ---------------------------------//
  signUp: async (req, res, next) => {
    // need to validate email & password
    console.log("controller Sign Up");
    //  console.log("contents of req.value.body ---> ", req.value.body);

    const {
      email,
      password,
      type,
      name,
      address,
      phoneNumber
    } = req.value.body;

    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    const activation = false;
    const updates = [];
    const allRatings = [];
    const avgRating = 0;
    const notification = [];
    const orders = [];
    const busy = false;
    const shoppingCart = [];

    if (type === "staff") {
      const newUser = new User({
        method: "local",
          type: type,
          name: name,
          password: password,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          activation: activation,
          updates: updates,
          allRatings: allRatings,
          avgRating: avgRating,
          notification: notification,
          orders: orders,
          busy: busy
        
      });
      await newUser.save();
      // res.json({ user: "created" });
      console.log("staff created");

      // generate a new token for the new user
      const token = signToken(newUser);
      res.status(200).json({ token });
    }
    if (type === "buyer") {
      const newUser = new User({
        method: "local",
          type: type,
          name: name,
          password: password,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          activation: activation,
          updates: updates,
          allRatings: allRatings,
          avgRating: avgRating,
          notification: notification,
          orders: orders,
          shoppingCart: shoppingCart
        
      });
      await newUser.save();
      // res.json({ user: "created" });
      console.log("buyer created");

      // generate a new token for the new user
      const token = signToken(newUser);
      const decoded= jwtDecode(token)
      console.log(decoded.sub)
      const user = await User.findOne({_id: decoded.sub})
      console.log(user.type)
      const userType = user.type
  
      res.status(200).json({ userType  });
    }
    
  },

  //-----------------------------------sign In ---------------------------------//
  signIn: async (req, res, next) => {
    // need to generate token
    console.log("controller Sign In");
    //console.log("req.user -->",req.user)

    const token = signToken(req.user);
    const decoded= jwtDecode(token)
    console.log(decoded.sub)
    const user = await User.findOne({_id: decoded.sub})
    console.log(user.type)
    const userType = user.type
    const userID = decoded.sub
    //res.json({ token: `Bearer ${token}` });
    res.status(200).json({ userType, userID , token});
  },

  //-----------------------------------google oauth ---------------------------------//
  googleOAuth: async (req, res, next) => {
    console.log("req.user------> ", req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  //-----------------------------------Secret ---------------------------------//
  Secret: async (req, res, next) => {
    console.log("controller Secret");
    res.json({ secret: "resource" });
  }
};
