const querystring = require('querystring')


const blogRouter = require('../src/router/blog')
const loginRouter = require('../src/router/userlogin')
const {
    set,
    get
} = require('../src/redis/redis')
// let SESSION_DATA = {} //没有引入redis时，session的容器


//设置cookie缓存的时间
const createExpires = () => {
    const time = new Date()
    time.setTime(time.getTime() * 2000)
    return time.toGMTString()
}



//用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })

    })
    return promise
}

const serverbandle = (req, res) => {

    res.setHeader('content-type', 'application/json')
    //基于模块化化的思想  可以将一些必要的参数添加到req上，减少代码的冗余

    //获取路径
    const url = req.url
    req.path = url.split('?')[0]

    //解析params
    req.query = querystring.parse(url.split('?')[1])

    //解析client 带过来的cookie -> k1=v1;k2=v2;k3=v3,,,,,
    req.cookie = {}
    const reqCookie = req.headers['cookie']
    if (reqCookie) {
        reqCookie.split(';').forEach(val => {
            const arr = val.split('=')
            req.cookie[arr[0].trim()] = arr[1].trim()
        })
    }

    //将session 与 cookie 关联 用SESSEION_DATA存会会话信息
    // let setCookie = false  //判断是否要设置cookie
    // let userId = req.cookie.id
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    //     // req.session = SESSION_DATA[userId]
    // } else {
    //     userId = Math.random() * 100 + '_' + new Date().getTime()
    //     SESSION_DATA[userId] = {}
    //     // req.session = SESSION_DATA[userId]
    // }
    // req.session = SESSION_DATA[userId] //逆向逻辑，减少代码冗余

    //用redis存会话信息
    let setCookie = false //判断是否要设置cookie
    let userId = req.cookie.id
    req.id = userId
    if (!req.id) {
        setCookie = true
        req.id = `${new Date().getTime()} _ ${Math.random() *1000}`
        set(req.id, {})
        req.session = {}
    }
    get(req.id).then((sessionData) => {
        if (sessionData) {
            req.session = sessionData
        }
        return getPostData(req)
    })
    //处理postData
    .then(postdata => {
        req.body = postdata

        //处理blog路由
        const blogData = blogRouter(req, res)
        console.log('serverbandel.js blogdata is ', blogData)
        // 异步处理的时候 可能结果还没有返回，blogData可能为undefined
        if (blogData) {
            blogData.then((dataResult) => {

                if (setCookie) {
                    res.setHeader('Set-Cookie', `id=${req.id}; path=/; expires=${createExpires()}; httpOnly`);
                }

                res.end(JSON.stringify(dataResult))
                console.log('res.end runned')
            })
            return
        }
        console.log('blogData after run')
        // console.log('after run') 先于上面的run，上面的是promise异步，会后于同步任务的执行

        const loginData = loginRouter(req, res)
        if (loginData) {
            loginData.then((loginResult) => {

                if (setCookie) {
                    console.log('setcookie run')
                    res.setHeader('Set-Cookie', `id=${req.id}; path=/; expires=${createExpires()}; httpOnly`);
                }

                res.end(JSON.stringify(loginResult))
            })
            return
        }
        res.writeHead(404, {
            "content-type": "text/html"
        })
        res.write('<h1 style = "text-align:center;margin-top:50px;">404 NOT Found</h1>')
        res.end()

    })

}

module.exports = serverbandle