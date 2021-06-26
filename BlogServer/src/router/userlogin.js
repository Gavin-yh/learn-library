const _login = require('../controller/userlogin')

const {
    successModel,
    errorModel
} = require('../model/resModel')

const { set } = require('../redis/redis')

let loginRouter = (req, res) => {

    // 登入
    if (req.method === "POST" && req.path === "/api/blog/login") {
        const {
            username,
            password
        } = req.body
        console.log(req.body)
        const loginResult = _login(username, password)
        return loginResult.then((result) => {
            if (result) {

                //登入后将数据存到session中,  在各个页面用于判断是否已经登入
                req.session.username = result.username
                req.session.realname = result.realname
                //同步到redis中

                set(req.id, req.session)

                return new successModel({
                    "login": "登入成功"
                })
            }
            return new errorModel({
                "login": "登入失败"
            })
        })
    }

    if (req.method === "GET" && req.path === "/api/blog/login-test") {
        if (req.session.username) {
            return Promise.resolve(new successModel({
                name:req.session.username
            },'登入成功'))
        }
        console.log(req.session)
        return Promise.resolve(new errorModel('尚未登入'))

    }


}

module.exports = loginRouter