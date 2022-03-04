const mongoose = require("mongoose");

const Player = new mongoose.Schema({
    username: String,
    avatar: String,
    playerRank: String,
    playerLevel: Number,
    address: String,
    currentSOIL: Number,
    
}, {timestamps: true});

const playerModel = mongoose.model('players', Player);

module.exports = playerModel;