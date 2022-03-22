const Entry = require('../models/entryModel')

// GET - /api/entries
const getEntries = async (req, res) => {
    const entries = await Entry.find()
    res.status(200).json(entries)
}

// POST - /api/entries
const createEntry = async (req, res) => {
    if (!req.body.title) {
        res.status(400).json({ message: 'please add title' })
    }
    if (!req.body.comments) {
        res.status(400).json({ message: 'please add comments' })
    }

    const entry = await Entry.create({
        title: req.body.title,
        comments: req.body.comments
    })
    res.status(200).json(entry)
}

// PUT - /api/entries/:id
const updateEntry = async (req, res) => {
    res.status(200).json({ message: 'update entry'})
}

// DELETE - /api/entries/:id
const deleteEntry = async (req, res) => {
    res.status(200).json({ message: 'delete entry'})
}


module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry,
}