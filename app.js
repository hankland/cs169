/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , handlers = require('./handlers');
var register = require('./routes/register.js')
  , login = require('./routes/login.js')
  , logout = require('./routes/logout.js')
  , account = require('./routes/account.js')
  , create_character = require('./routes/create_character.js')
  , select_character = require('./routes/select_character.js')
  , play = require('./routes/play.js')
  , battle = require('./routes/battle.js')
  , end_battle = require('./routes/end_battle.js')
  , attack = require('./routes/battle_commands.js').attack
  , flee = require('./routes/battle_commands.js').flee
  , update_experience = require('./routes/update_experience.js');

var app = express();
var cookieParser = express.cookieParser('your secret here')
  , sessionStore = new express.session.MemoryStore();

module.exports = app;

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
app.post('/register', register);
app.post('/login', login);
app.get('/logout', logout);
app.get('/account', account);
app.post('/create_character', create_character);
app.post('/select_character', select_character);
app.get('/play', play);
app.get('/battle', battle);
app.post('/attack', attack);
app.post('/flee', flee);
app.get('/end_battle', end_battle);
app.post('/update_experience', update_experience);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io = require('socket.io').listen(server);

var SessionSockets = require('session.socket.io')
  , sessionSockets = new SessionSockets(io,sessionStore,cookieParser);


sessionSockets.on('connection', handlers);


