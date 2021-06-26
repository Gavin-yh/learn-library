let mysql = require('mysql')
let {
    config
} = require('../config/db.config')

let connection = mysql.createConnection(config)

connection.connect()

function exe(sql) {
    let promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, res) => {
            if (err) {
                resolve(null)
                return
            }
            resolve(res)
        })
    })
    return promise
}


module.exports = {
    exe
}