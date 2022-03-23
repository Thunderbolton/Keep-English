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
    const entry = await Entry.findById(req.params.id)

    if(!entry) {
        res.status(400).json({ message: 'Could not find entry.' })
    }

    const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updatedEntry)
}

// DELETE - /api/entries/:id
const deleteEntry = async (req, res) => {

    const entry = await Entry.findById(req.params.id)

    if(!entry) {
        res.status(400).json({ message: 'Could not find entry.' })
    }
    
    await entry.deleteOne()

    res.status(200).json({id: req.params.id})
}


module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry,
}