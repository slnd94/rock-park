const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  // finalize stripe transaction:
  app.post(
    '/api/stripe',
    requireLogin, // our middleware that filters out requests with no auth user
    async (req, res) => {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5',
        // this is the id that was returned from stripe on
        // the initial call and which they will be expecting
        // in the followup call from our server:
        source: req.body.id
      })
      
      // we have req.user, and it is already wired up the the user model,
      // because passport middleware automatically attaches it to 
      // every request

      // add the credits to the user (modify user cart here)
      req.user.credits += 5

      // persist the user to db
      const user = await req.user.save()

      // respond with current user, so the front end can
      // update its user obj
      res.send(user)
    }
  )
}
