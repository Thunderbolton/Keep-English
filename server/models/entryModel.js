const mongoose = require('mongoose')
const { Schema } = mongoose;

const entrySchema = new Schema({
    title: String,
    comments: String,
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Entry', entrySchema)