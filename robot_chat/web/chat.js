let http = require('http')
let fs = require('fs')
let url = require('url')
let request = require('request');
let data = fs.readFileSync('../page/chat.html')

let img = fs.readFileSync('../img/3.jpg')
let timg = fs.readFileSync('../img/timg.jpg')

http.createServer((req, res) => {

    let pathname = url.parse(req.url).pathname

    if (pathname === '/api') {
        let query = url.parse(req.url, true).query//将参数直接解析成对象形式
        let body = {
            "reqType": 0,
            "perception": {
                "inputText": {
                    "text": query.mes
                },
            },
            "userInfo": {
                "apiKey": "f70738d284594befa7dab833722a8c95",
                "userId": "abc"
            }
        }
        request({
            url: 'http://openapi.tuling123.com/openapi/api/v2',
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        }, (err, respose, body) => {
            if (!err && respose.statusCode == 200) {
                let bodyData = JSON.parse(body).results[0].values
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(bodyData))
            }
        })
    } else {
        if (pathname === '/') {
            res.setHeader('content-type', 'text/html')
            res.end(data)
        }else{
            res.setHeader('content-type','image/jpg')
            if(pathname === '/img/3.jpg'){
                res.end(img)
            }
            if(pathname === '/img/timg.jpg'){
                res.end(timg)
            }
        }
    }


}).listen(8000)