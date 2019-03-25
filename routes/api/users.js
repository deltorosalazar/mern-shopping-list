const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

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
      if (user) return res.status(400).json({ msg: 'User alredy exists'})

      const newUser = new User({
        name: name,
        email: email,
        password: password
      })

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error          

          newUser.password = hash

          newUser.save()
            .then(user => {

              jwt.sign(
                { id: user.id },
                config.get('JWTSecret'),
                { expiresIn: 3600 },
                (error, token) => {
                  if (error) throw error

                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email 
                    }
                  })
                }
              )              
            })
        })
      })
    })
})


module.exports = router