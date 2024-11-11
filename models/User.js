const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
        trim:true,
    },
    familyConnections:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
