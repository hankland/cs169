
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , login = require('./routes/login.js')
  , logout = require('./routes/logout.js')
  , account = require('./routes/account.js')
  /* SH: ADDED */
  , register = require('./routes/register.js')
  , charactercreation = require('./routes/character_creation.js')
  , createcharacter = require('./routes/create_character.js')
  , selectcharacter = require('./routes/select_character.js')
  , play = require('./routes/play.js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
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
/* SH: ADDED */
app.post('/register', register);
app.get('/character_creation', charactercreation);
app.post('/create_character', createcharacter);
app.post('/select_character', selectcharacter);
app.get('/play', play);



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
