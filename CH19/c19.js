

const http = require('http')
const fs = require('fs')
const content = fs.readFileSync('./views/index.ejs', 'utf-8')
//const content1 = fs.readFileSync('add.ejs', 'utf-8')

http.createServer(function (req, res){
    res.writeHead(200, {"content-type":"ejs"})
    res.end(content)
}).listen(3000)