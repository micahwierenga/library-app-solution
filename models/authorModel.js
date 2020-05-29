// WE'LL NEED AN AUTHOR MODEL THAT HAS ONE FIELD: name
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Author', authorSchema);