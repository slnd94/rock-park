const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
 googleId: String, // for users from google OAuth
 credits: { type: Number, default: 0 }
 // structured shopping cart could go here
})

// create model from schema
mongoose.model('users', userSchema)
