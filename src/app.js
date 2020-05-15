// 引入 express 模块
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const userRouter = require('./routes/users')
const recipeRouter = require('./routes/recipe')
const dynomicRouter = require('./routes/dynomic')


// 创建 express 实例
const app = express()

// 配置 bodyParse 
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
})

// 配置session 通过req.session来设置，访问
// 添加：req.session.foo = 'bar'
// 访问：req.session.foo
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
// 开放静态资源
app.use('/public/', express.static('./public'))
app.use(jsonParser)
app.use(urlencodedParser)
app.use((err,req,res,next) => {
    if(err) {
        res.status(500).send(err.message)
    }
})

// 注册路由
app.use(userRouter)
app.use('/send',recipeRouter)
app.use('/send',dynomicRouter)

// 服务监听
app.listen(3000,() => {
    console.log('Running ...')
})
