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

const auth = require('../../config/auth');

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

router.route("/staff/oauth/google").post(passportGoogleStaff, UsersController.googleOAuth);
router.route("/buyer/oauth/google").post(passportGoogleBuyer, UsersController.googleOAuth);

router.route("/secret").get(passportJWT, UsersController.Secret);

router.get('/current',auth, (req,res)=>{

  res.json("access allowed")
})

module.exports = router;
