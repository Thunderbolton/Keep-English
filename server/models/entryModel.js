const mongoose = require('mongoose')
const { Schema } = mongoose;

const entrySchema = new Schema({
    title: String,
    comments: String,
    category: {type: String, possibleValues: ['Daily','Business','Travel','Exam']}
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Entry', entrySchema)