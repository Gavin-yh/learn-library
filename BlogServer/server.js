const http = require('http')
const PORT = 8000
const serverbandle = require('./serverBandle/serverbandle')

http.createServer(serverbandle).listen(PORT)
