const mongoose = require('mongoose')
const { Schema } = mongoose;

const entrySchema = new Schema({
    text: String,
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Entry', entrySchema)