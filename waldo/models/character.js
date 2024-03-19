const mongoose = require('mongoose');
const Schema = mongoose.Schema

const characterSchema = new Schema({
    name: {
        type: String
    },
    left: {
        type: Number
    },
    top: {
        type: Number
    }
})

const Character = mongoose.model('Character', characterSchema)

module.exports = Character;