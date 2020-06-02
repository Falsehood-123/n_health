const express = require('express')
const User = require('../mongoose/users.js')
const md5 = require('blueimp-md5')

const router = express.Router()

// 每次刷新时的请求
router.post('/check', (req,res) => {
    let {id} = req.body
    User.findById(id,(err,data) => {
        if(err) {
            return res.sendStatus(500).send('error')
        }
        res.send(data)
    })
})
// 登录请求
router.post('/login', (req,res) => {
    User.findOneAndUpdate({
        phone:req.body.phone,
        password:md5(md5(req.body.password))},{loginType:true},(err,data) => {
        if(err) {
            return res.sendStatus(500).send('error')
        } else {
            User.findById(data.id,(err,data) => {
                if(err) {
                    return res.sendStatus(500).send('error')
                }
                res.send(data)
            })
        }
    })
})
// 退出请求
router.get('/logout', (req,res) => {
    let {id} = req.query
    User.findOneAndUpdate({_id:id},{loginType:false},(err,data) => {
        if(err) {
            return res.sendStatus(500).send('error')
        } else {
            User.findById(data.id,(err,data) => {
                if(err) {
                    return res.sendStatus(500).send('error')
                }
                res.send(data)
            })
        }
    })
})
// 注册请求
router.post('/register', (req,res) => {
    // 获取数据
    // 操作数据库
    // 发送响应
    let body = req.body
    User.findOne({
        $or:[
            {username:body.username},
            {phone:body.phone}]}, (err,data) => {
        if(err) {
            return res.sendStatus(500).send('server error')
        }
        if(data) {
            res.sendStatus(200).send('已存在')
        }
        body.password = md5(md5(body.password))
        new User(body).save((err,user) => {
            if(err) {
                return res.sendStatus(500).json({
                    success: false,
                    message:'server error'
                })
            }
            res.send(user)
        }) 
    })
})

module.exports = router
