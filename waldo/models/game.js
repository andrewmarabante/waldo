const mongoose = require('mongoose');
const Schema = mongoose.Schema

const gameSchema = new Schema({
    username: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
    }
}, {timestamps:true})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game;