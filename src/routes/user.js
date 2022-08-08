const { Router } = require('express')
const User = require('../models/user')

const router = Router()

router.post('/', async (req, res) => {
  const newUser = new User(req.body)

  try {
    const user = await newUser.save()
    if (!user) throw new Error('The user could not be saved!')
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router