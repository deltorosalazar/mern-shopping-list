const express = require('express')
const router = express.Router()

const Item = require('../../models/Item')

router.get('/', (req, res) => {
  Item.find()
    .sort({
      date: -1
    })
    .then(response => res.json(response))
})

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  })

  newItem.save()
    .then(response => res.json(response))
})

router.delete('/:id', (req, res) => {
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