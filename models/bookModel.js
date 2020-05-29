// WE'LL NEED A BOOK MODEL THAT HAS THREE FIELDS: title, yearPublished, coverImageUrl, author
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    yearPublished: Number,
    coverImageUrl: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Book', bookSchema);