/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
require('coffee-script');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../.tmp')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
require('./routes/index')(app);
require('./routes/api')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
