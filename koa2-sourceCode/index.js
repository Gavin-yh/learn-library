const Koa = require('./src/application.js')
// const Koa = require('koa')

const  app = new Koa()
//源码里面可以配置参数

 app.use((ctx,next) => {
     console.log(ctx.cookies)
     next()
     ctx.body += 'hello world'
    //  next()
 })

 app.use(ctx => {
     ctx.body = 'gavin'
 })

app.listen(3000, () => {
    console.log('server is run')
})


module.exports = async function(ctx, next) {
    const {res, req} = ctx
    const blackList = ['127.0.0.1']
    const ip = getClientIP(req); // 自定义的获取ip的方法

    if(blackList.includes(ip)) {  // 出现在黑名单内，
        ctx.body = "不允许访问"
    }else{
        await next()
    }
}

function getClientIP(req) {
    return (
        req.headers["x-forwarded-for"] || //  判断是否方向代理  IP
        req.connection.remoteAddress || // 判断是否是connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress
    )
}

