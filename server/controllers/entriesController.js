const Entry = require('../models/entryModel')

// GET - /api/entries
const getEntries = async (req, res) => {
    const entries = await Entry.find().sort({'updatedAt': -1})
    res.status(200).json(entries)
}

// POST - /api/entries
const createEntry = async (req, res) => {
    const {title, comments} = req.body
    
    try {
        const entry = await Entry.create({title, comments})
        res.status(200).json(entry)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
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
    
    await entry.deleteOne()

    if(!entry) {
        res.status(400).json({ message: 'Could not find entry.' })
    }

    res.status(200).json(entry)
}


module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry,
}