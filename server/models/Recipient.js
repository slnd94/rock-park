const mongoose = require('mongoose')
const { Schema } = mongoose

// sub-document schema
const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
})

module.exports = recipientSchema
