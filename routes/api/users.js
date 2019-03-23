const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../../models/User')

router.post('/register', (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      msg: 'Please enter all fields'
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) return res.status(200).json({ msg: 'User alredy exists'})

      const newUser = new User({
        name: name,
        email: email,
        password: password
      })

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error          
          newUser.save()
            .then(user => {
              res.json({
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email 
                }
              })
            })
        })
      })
    })
})


module.exports = router