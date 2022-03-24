const mongoose = require('mongoose')
const { type } = require('os')

const Schema = mongoose.Schema


const threadSchema = new Schema({
    id_owner: {
        type: String,
        required: true
    },
    userName_owner: {
        type: String,
        required: true
    },
    headLine: {
        type: String,
        required: true,
    },
    post: [

        {
            id_owner: String,
            userName_owner: String,
            headLine_post: String,
            text_post: String,
            likes : Number,
            dislikes : Number,
            created_post: {
                type: Date,
                default: new Date()
            },
        }
    ],
    created: {
        type: Date,
        default: new Date()
    }
})

const Thread = mongoose.model('Tread', threadSchema)
module.exports = Thread