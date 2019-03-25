const express = require('express')
const mongoose = require('mongoose')
const app = express()
const config = require('config')

app.use(express.json())

const db = config.get('mongoURI')

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(error => {
    console.log(error)
  })

const port = process.env.PORT || 5432

app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

app.listen(port, () => console.log(`Server running on port ${port}`))