const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

// User class from our model
const User = mongoose.model('users')

// called by passport after our auth callback says 'done'
passport.serializeUser((user, done) => {
  // callback: tell passport to encode the user id in the session cookie as the token
  done(null, user.id)
})

// called by passport when receiving cookie with web req,
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    // callback: tell passport to add found user onto the req object as req.user
    done(null, user)
  })
})

// set up passport to use google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    // our callback routine
    // this called by passport AFTER we get the google profile
    // (which we did by using the code google sent to our callback URL):
    async (accessToken, refreshToken, profile, done) => {
      // see if we have user matching the google profile id received
      const existingUser = await User.findOne({ googleId: profile.id })
      if (existingUser) {
        // we already have this user
        // tell passport we are done with sign in,
        // and pass it the found user
        return done(null, existingUser)
      }
      
      // we don't have this user.  Make a new record
      const newUser = await new User({ googleId: profile.id }).save()
      // tell passport we are done with sign in,
      // and pass it the new created user
      done(null, newUser)
    }
  )
)

