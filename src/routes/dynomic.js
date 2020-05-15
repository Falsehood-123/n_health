const express = require('express')
const Dynomic = require('../mongoose/dynomic.js')
const md5 = require('blueimp-md5')
const router = express.Router()

// 发布菜谱
router.post('/dynomic',(req,res) => {
    // 获取数据
    // 操作数据库
    // 发送响应
    let body = req.body
    new Dynomic(body).save((err,data) => {
        if(err) {
            return res.sendStatus(500).json({
                success: false,
                message:'server error'
            })
        }
        res.send(data)
    }) 
})


module.exports = router
