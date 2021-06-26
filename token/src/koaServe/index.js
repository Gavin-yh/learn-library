const Koa = require("koa")
const Router = require("koa-router")
//生产令牌
const jwt = require("jsonwebtoken")
//验证令牌
const jwtAuth = require("koa-jwt")

const secret = "*iddDD_(99"

const app = new Koa()

const router = new Router()

router.get("/api/login", async ctx => {
    const {username, password} = ctx.query
    
    if (username == "gavin" && password == "111") {
        //生成令牌
        const token = jwt.sign(
            {
                data: {
                    username
                },
                exp: Math.floor(Date.now() / 1000) + 60 * 60 //过期时间
            }, 
            secret
        )
        ctx.body = { code: 1, token}
    } else {
        ctx.state = 401
        ctx.body = { code: 0, message: "用户名或密码错误"}
    }
})

//jwtAuth  中间件验证令牌，是否过期，是否被修改
router.get( "/api/info", jwtAuth( {secret} ), async ctx => {
        console.log('success')
        ctx.body = {code: 1, data: {name: "gavin"}
    }
})

app.use(router.routes())
app.listen(3000, () => {
    console.log("serve is run")
});