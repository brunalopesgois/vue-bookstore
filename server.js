var history = require('connect-history-api-fallback');

var express = require('express')
var cors = require('cors')
var path = require('path')
var serveStatic = require('serve-static')
app = express()
//add this middleware
app.use(history());
app.use(serveStatic(__dirname))
var port = 80
app.listen(port)
console.log('server started '+ port)
var apiProxy = createProxyMiddleware('/api', { target: 'https://laravel-bookstore-api.herokuapp.com/' });
var frontendProxy = createProxyMiddleware('/', { target: 'https://livrariabc.herokuapp.com/' });

app.use(apiProxy);
app.use(frontendProxy);
