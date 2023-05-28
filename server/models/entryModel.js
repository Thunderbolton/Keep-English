const mongoose = require('mongoose')
const { Schema } = mongoose;

const entrySchema = new Schema({
    title: {
        type: String,
        required: true,
    },    
    comments: {
        type: String,
        required: true,
    },    
    category: {
        type: String, 
        possibleValues: ['Daily','Business','Travel','Exam'],
        required: true
    },
    user_id: {
        type: String, 
        required: true
    },
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Entry', entrySchema)