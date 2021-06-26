let escape = require('mysql').escape
let xss = require('xss')
let {
    exe
} = require('../db/dbUtil')
let {
    successModel,
    errorModel
} = require('../model/resModel')

let allBlog = () => {
    let sql = `select * from blogs`
    let all = exe(sql)
    return all.then((data) => {
        if (!data) {
            return new errorModel('没有数据')
        }
        return new successModel(data)
    })
}

let addBlog = () => {
    // console.log(res.body)
    // let sql = `insert into blogs(title,content,createtime,author) values()`
}

module.exports = {
    allBlog,
    addBlog
}