const passport = require('passport')

module.exports = (app) => {
  // our call to google OAuth
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )
  
  // our callback for google OAuth
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys')
    }
  )
  
  // logout route
  app.get(
    '/api/logout',
    (req, res) => {
      // call the logout function, which was attached to req by passport
      req.logout()
      res.redirect('/')
    }
  )
  
  // test that our user is attached by passport to the request
  app.get(
    '/api/current_user',
    (req, res) => {
      res.send(req.user)
    }
  )
}
