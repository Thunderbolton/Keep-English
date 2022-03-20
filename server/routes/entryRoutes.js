const express = require('express')
const router =  express.Router()
const { getEntries, createEntry, updateEntry, deleteEntry } = require('../controllers/entriesController')

router.get('/', getEntries)

router.post('/', createEntry)

router.put('/:id', updateEntry)

router.delete('/:id', deleteEntry)

module.exports = router