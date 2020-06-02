const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/health', {useNewUrlParser: true, useUnifiedTopology: true})
const Schema = mongoose.Schema


const dynomicSchema = new Schema({
    // 标题
    title: {
        type: String,
        default: ''
    },
    // 描述
    describe: {
        type: String,
        default: '' ,
        required: true
    },
    // 用户id
    userId: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        default: ''
    },
    imageBase: {
        type:Array,
        default: []
    },
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Dynomic', dynomicSchema)
