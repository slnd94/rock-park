const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User')
require('./models/Survey')
require('./services/passport')

// connect mongoose to our db
mongoose.connect(keys.mongoURI)

// init express app
const app = express()

// ensures post requests have the body parsed into req.body
app.use(bodyParser.json())

// tell express to use cookies to manage session
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiry
  keys: [keys.cookieKey]
}))

// tell passport to use session cookies
app.use(passport.initialize())
app.use(passport.session())

// require routes
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  // Express will serve up prod assets
  app.use(express.static('client/build'))

  // Express will serve up index.html if it doesn't recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// set port and listen
const PORT = process.env.PORT || 5001
app.listen(PORT)
