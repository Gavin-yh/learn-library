const {
    config
} = require('./config')
const mysql = require('mysql')

const con = mysql.createConnection(config)


con.connect()

function exe(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise

}

module.exports = {
    exe
}