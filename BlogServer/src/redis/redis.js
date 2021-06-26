const redis = require('redis')

const redisClient = redis.createClient(6379, '127.0.0.1')

redisClient.on('error', err => {
    console.log(err)
})

const set = (key, value) => {
    if (typeof value !== 'string') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
}
// id -> {}
const get = (key) => {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                resolve(null);
            }
            if (val === null) {
                resolve(null)
            }
            try{
                resolve(JSON.parse(val))
            }catch(e){
                resolve(val)
            }
        })
    })

    return promise
}

module.exports = {
    set,
    get
}