const mongoose = require("mongoose")
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required']
  },
  height: {
    type: String,
    trim: true,
    required: [true, 'Height is required']
  }
})

const User = mongoose.model('user', UserSchema)

module.exports = User