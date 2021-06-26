const {
    exe
} = require('../DB/mysql')

let _login = (userName, password) => {
        const sql = `select * from users where 1=1 and username='${userName}' and password='${password}' ` 
        return exe(sql).then((result) => {
            if (result.length > 0) {
                return result[0]
            }
            return false
        })

}

module.exports = _login