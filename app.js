
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , handlers = require('./handlers')
  , register = require('./routes/register.js')
  , login = require('./routes/login.js')
  , logout = require('./routes/logout.js')
  , account = require('./routes/account.js')
<<<<<<< HEAD
  , create_character = require('./routes/create_character.js')
  , select_character = require('./routes/select_character.js')
  , play = require('./routes/play.js')
  , battle = require('./routes/battle.js')
  , end_battle = require('./routes/end_battle.js')
  , attack = require('./routes/attack.js')
  , update_experience = require('./routes/update_experience.js')
  , flee = require('./routes/battle_commands.js').flee;

=======
  /* SH: ADDED */
  , register = require('./routes/register.js')
  , charactercreation = require('./routes/character_creation.js')
  , createcharacter = require('./routes/create_character.js')
  , selectcharacter = require('./routes/select_character.js')
  , play = require('./routes/play.js');
>>>>>>> last commit for sol branch, will work with integrated master branch

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
<<<<<<< HEAD
app.get('/account', account);
app.post('/create_character', create_character);
app.post('/select_character', select_character);
app.get('/play', play);
app.get('/battle', battle);
app.post('/attack', attack);
app.get('/end_battle', end_battle);
app.post('/update_experience', update_experience);
app.post('/flee', flee);
=======
/* SH: ADDED */
app.post('/register', register);
app.get('/character_creation', charactercreation);
app.post('/create_character', createcharacter);
app.post('/select_character', selectcharacter);
app.get('/play', play);


>>>>>>> last commit for sol branch, will work with integrated master branch

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io = require('socket.io').listen(server);

var SessionSockets = require('session.socket.io')
  , sessionSockets = new SessionSockets(io,sessionStore,cookieParser);


sessionSockets.on('connection', handlers);


