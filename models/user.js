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
    birthday: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
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