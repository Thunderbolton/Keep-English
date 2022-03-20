// GET - /api/entries
const getEntries = async (req, res) => {
    res.status(200).json({ message: 'get entries'})
}

// POST - /api/entries
const createEntry = async (req, res) => {
    if (!req.body.text) {
        res.status(400).json({ message: 'please add entry' })
    }
    res.status(200).json({ message: 'create entry'})
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