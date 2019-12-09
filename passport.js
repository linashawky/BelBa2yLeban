const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("./config/jwtSecret");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const User = require("./models/Users");

const LocalStrategy = require("passport-local").Strategy;

//--------------JWT STRATEGY-----------------//
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        // find user specified in token
        const user = await User.findById(payload.sub);

        // if user doesn't exists
        if (!user) {
          return done(null, false);
        }
        // else return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
//--------------GOOGLE OAUTH STRATEGY-----------------//

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "88919331217-b02afe1t18j11p15ju4ob2svsl8u5bh6.apps.googleusercontent.com",
      clientSecret: "kMWQaz4BVZ8lF87mn-ZbetBn"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("accessToken-->", accessToken);
        // console.log("refreshToken-->", refreshToken);
        // console.log("profile-->", profile);

        //-------- check if user exist tin our DB-----
        const existingUser = await User.findOne({ "googleID": profile.id });
        if (existingUser) {
          console.log("user already exist in DB")
          return done(null, existingUser);
        }

        //----------else
        console.log('user doesnot exist in DB')
        const newUser = new User({
          method: "google",
            id: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName.value,
            notifications:[],
            orders:[],
            avgRating:0

          
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

//--------------LOCAL STRATEGY-----------------//

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // find the user given the email
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false);
        }
        // check if password isn't correct
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
          return done(null, false);
        }
        //else return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
