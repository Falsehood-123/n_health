const express = require('express')
const multer = require('multer')
const fs = require('fs')
const Recipe = require('../mongoose/recipe.js')
const md5 = require('blueimp-md5')
const router = express.Router()

function refreshRecipe(body,id) {
    Recipe.findByIdAndUpdate(id,{
        $push: {
            step: {
                $each: body.step
            }
        }
    },(err,data) => {
        if(err) {
            return res.sendStatus(500).json({
                success: false,
                message:'server error'
            })
        }
    })
}
// 发布菜谱
router.post('/recipe',(req,res) => {
    // 获取数据
    // 操作数据库
    // 发送响应
    let body = req.body
    new Recipe(body).save((err,data) => {
        if(err) {
            return res.sendStatus(500).json({
                success: false,
                message:'server error'
            })
        }
        refreshRecipe(body,data._id)
        res.send('ok')
    }) 
})

router.post('/recipe/img',(req,res) => {
    res.sendStatus(200)
})

// 查询所有菜谱
router.get('/findAllRecipe',(req,res) => {
    Recipe.find((err,data) => {
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
