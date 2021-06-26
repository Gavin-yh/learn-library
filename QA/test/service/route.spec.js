const superagent = require('supertest')
const app = require('./index')

function request() {
    return superagent(app.listen())
}
 describe("node 接口测试",() => {
     it("test接口测试", (done) => {
         request()
         .get('/getInfo')
         .expect(200)
         .expect("Content-Type", /json/)
         .end((err, res) => {
             if (err) {
                 done(err)
             }
             if (res.body.msg == "后端接口测试") {
                 done()
             }else{
                 done(new Error("接口数据异常"))
             }
         })

        //可以装个fetch的包
        // 其他后端语言
        // fetch("http://localhost/index.php", (res) => {
        //     if (err) {
        //         done(err)
        //     }
        //     if (res.body.msg == "后端接口测试") {
        //         done()
        //     } else {
        //         done(new Error("接口数据异常"))
        //     }
        // })
     })
 })