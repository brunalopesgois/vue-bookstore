var history = require('connect-history-api-fallback');

var express = require('express')
var cors = require('cors')
var path = require('path')
var serveStatic = require('serve-static')
app = express()
//add this middleware
app.use(history());
app.use(serveStatic(__dirname))
var port = process.env.PORT || 5000
app.listen(port)
console.log('server started '+ port)
app.use(cors())

app.options('*', cors())

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 80')
})