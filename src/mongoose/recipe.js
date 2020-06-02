const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/health', {useNewUrlParser: true, useUnifiedTopology: true})
const Schema = mongoose.Schema


const recipeSchema = new Schema({
    // 标题
    title: {
        type: String,
        required: true
    },
    // 描述
    describe: {
        type: String,
        default: '' ,
        required: true
    },
    // 成品图
    finishImg: {
        type: String,
        default: ''
    },
    // 用料
    season: {
        type: String,
        default: ''
    },
    // 步骤
    step: {
        type: Array,
        default: [{
            imageUrl:'',
            des:''
        }]
    },
    // 小提示
    tip: {
        type: String,
        default: ''
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
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Recipe', recipeSchema)
