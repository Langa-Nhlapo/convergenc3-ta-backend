const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const PORT = process.env.PORT || 3001
const path = require('path')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const UserRoutes = require('./routes/user')

dotenv.config()

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/send_mail', async (req, res) => {
  var name = req.body.name
  var averageHeight = req.body.avgHeight

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: 'southerntlogistics@gmail.com',
    subject: 'Convergenc3 Tech Assessment',
    html: `<div className="email" style="
    border: 1px solid block;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
    ">
    <h2>Welcome ${name}</h2>
    <p>Your average height is ${averageHeight} cm</p>
    
    <p>Kind Regards,</p>
    <p>Convergenc3 Team</p>
    </div>`
  })
})

mongoose
  .connect(process.env.DB_CONNECTION_LIVE, 
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  .then(() => console.log('Database Connected!'))
  .catch((err) => console.log(err))

app.use('/user', UserRoutes)

app.listen(PORT, (err) => {
  if (err) {
     return console.log('Unable to start server')
  }

  return console.log(`Server running on port ${PORT}`)
})