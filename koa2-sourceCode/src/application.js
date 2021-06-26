const http = require('http')
const context = require('./context.js')
const request = require('./request.js')
const response = require('./response.js')

class myKoa {
    constructor() {
        this.middlewares = []
    }
    listen(...arg) {
        const app = http.createServer((req, res) => {

            //创建上下文对象
            const ctx = this.createContext(req, res)

            // this.callback(ctx)
            let fn = this.compose(this.middlewares)

            fn(ctx)

            //响应
            res.end(ctx.body)
        })
        app.listen(...arg)
    }
    use(callback) {
        this.middlewares.push(callback)
    }

    //构建上下文
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        return ctx
    }

    //合成函数
    compose(middlewares) {
        return function (ctx) {
            function dispatch(i) {
                let fn = middlewares[i]
                if(!fn) {
                    return Promise.resolve()
                }
                return Promise.resolve(
                    //ctx, next
                    fn(ctx, function(){
                        return dispatch(i + 1)
                    })
                )
            }
            return dispatch(0)
        }
    }
}




module.exports = myKoa





























