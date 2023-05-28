const express = require('express')
const { getEntries, createEntry, updateEntry, deleteEntry } = require('../controllers/entriesController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getEntries)

router.post('/', createEntry)

router.put('/:id', updateEntry)

router.delete('/:id', deleteEntry)

module.exports = router