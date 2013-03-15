
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , handlers = require('./handlers')
  , login = require('./routes/login.js')
  , logout = require('./routes/logout.js')
  , account = require('./routes/account.js')
  , play = require('./routes/play.js');

var app = express();
var cookieParser = express.cookieParser('your secret here')
  , sessionStore = new express.session.MemoryStore();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(cookieParser);
  app.use(express.session({store: sessionStore}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/login', login);
app.get('/account', account);
app.get('/logout', logout);
app.get('/play', play);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io = require('socket.io').listen(server);

var SessionSockets = require('session.socket.io')
  , sessionSockets = new SessionSockets(io,sessionStore,cookieParser);


sessionSockets.on('connection', handlers);


