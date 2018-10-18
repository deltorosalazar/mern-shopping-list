const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const items = require('./routes/api/items')



const app = express()

app.use(bodyParser.json())

const db = require('./config/keys').mongoURI

mongoose.connect(db, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(error => {
    console.log(error)
  })

const port = process.env.PORT || 5000

app.use('/api/items', items)

app.listen(port, () => console.log(`Server running on port ${port}`))