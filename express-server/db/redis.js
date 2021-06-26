const redis = require('redis')

const redisClient = redis.createClient(6379, '127.0.0.1')

//redis 在创建连接后一定要先监听一下有没有报错,
redisClient.on('error', err => {
    console.log(err)
})

module.exports = {
    redisClient
}