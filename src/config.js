const mongoose = require('mongoose')
const MONGO_URI = process.env.DATABASE

mongoose.connect(MONGO_URI, (err) => {
  console.log(err)
})

const PORT = process.env.PORT || 3001
const mongoUri = process.env.MONGO_URI

module.exports = { mongoUri, PORT }