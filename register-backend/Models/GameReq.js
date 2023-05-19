const mongoose = require('mongoose');

// Define the schema for the game
const gameSchema = new mongoose.Schema({
    email: String,
    game: String,
    freetime: [
        {
            from: Date,
            till: Date,
        },
    ],
});

// Create a model for the game collection
const Game = mongoose.model('Game', gameSchema);
