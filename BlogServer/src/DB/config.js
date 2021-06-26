const env = process.env.NODE_ENV
console.log(env)
let config
if (env === 'development') {
    config = {
        host: 'localhost',
        user: 'root',
        port:3306,
        password: '123456',
        database: 'myblog',
        insecureAuth: 'true'
    }
} else {
    config = {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: '123456',
        database: 'myblog',
        insecureAuth: 'true'
    }
}

module.exports = {
    config
}