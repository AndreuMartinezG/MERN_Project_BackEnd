const mongoose = require('mongoose')
const { type } = require('os')

const Schema = mongoose.Schema


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    },
    followers: [{
        type: Array,
        Id_follower: {
            type: String,
        }
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User