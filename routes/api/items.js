const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const Item = require('../../models/Item')

router.get('/', (req, res) => {
  Item.find()
    .sort({
      date: -1
    })
    .then(response => res.json(response))
})

router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  })


  newItem.save()
    .then(item => res.json(item))
})

router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({
      success: true
    })))
    .catch(error => {
      res.json({
        success: false
      })
      console.log(error);
    })
})

module.exports = router