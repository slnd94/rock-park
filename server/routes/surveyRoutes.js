const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = app => {  
  app.get(
    '/api/surveys',
    requireLogin,
    async (req, res) => {
      const surveys = await Survey.find({ _user: req.user.id })
      .sort({ dateSent: -1 })  
      .select({
          recipients: false // exclude the list of recipients in the returned surveys
        })
      
      res.send(surveys)
    }
  )

  app.get(
    '/api/surveys/thanks',
    (req, res) => {
      res.send('Thanks for voting!')
    }
  )

  app.post(
    '/api/surveys',
    requireLogin,
    requireCredits,
    async (req, res) => {
      const { title, subject, body, recipients } = req.body

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now()
      })

      // create the email
      const mailer = new Mailer(survey, surveyTemplate(survey))

      try {
        // send the email
        await mailer.send()
        
        // save survey to db
        await survey.save()

        // update user balance
        req.user.credits -= 1
        const user = await req.user.save()

        // respond with current user, so the front end can
        // update its user obj with new credits balance
        res.send(user)
      } catch (err) {
        res.status(422).send(err) // code 422 "un-processable request"
      }
    }
  )
}
