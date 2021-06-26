const express = require('express')

const app = express()

app.get('/getInfo', (req, res, next) =>{
    res.json({
        msg: "后端接口测试"
    })
})

app.listen(3000, () => {
    console.log("server is run")
})

module.exports = app