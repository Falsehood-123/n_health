const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/health', {useNewUrlParser: true, useUnifiedTopology: true})
const Schema = mongoose.Schema


const userSchema = new Schema({
    // 用户名
    username: {
        type: String,
        require: true
    },
    // 密码
    password: {
        type: String,
        required: true
    },
    // 手机号
    phone: {
        type: Number,
        required: true
    },
    // 性别
    gender: {
        type: String,
        default: '保密'
    },
    // 年龄
    age: {
        type: Number
    },
    // 爱好
    hobbies: {
        type: String,
        default: ''
    },
    // 账号创建时间
    createTime: {
        type: Date,
        default: Date.now
    },
    // 头像
    avatar: {
        type: String,
        default: '/public/img/avatar.jpg'
    },
    // 介绍
    bio: {
        type: String,
        default: ''
    },
    // 账号状态
    status: {
        // 0:正常，1:无法评论，2：无法发动态，3：无法发菜谱，4：无法登陆
        type: Number,
        enum: [0,1,2,3,4],
        default:0
    },
    // 用户类型
    userType: {
        type: Boolean,
        default: false
    },
    // 登录状态
    loginType: {
        type:Boolean,
        default:false
    },
    // 菜谱id
    recipeIds: {
        type: String,
        default: ''
    },
    // 动态id
    dynomicIds: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('User', userSchema)
