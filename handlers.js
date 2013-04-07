User = require('./models').User;
Area = require('./models').Area;
Class = require('./models').Class;
Character = require('./models').Character;
Monster = require('./models').Monster;
Item = require('./models').Item;

var smallArea = "ACBAABACCBBABCAAABBABAABC";
var largeArea = "";

for (var i = 0; i < 20*20; i++) {
  largeArea += "A";
}

var defaultArea = largeArea; // the area we want to use for overworld
var AREA_WIDTH = Math.floor(Math.sqrt(defaultArea.length)); // x-dimension size
var AREA_HEIGHT = Math.floor(Math.sqrt(defaultArea.length)); // y-dimension size
var TILE_SIZE = Math.floor(500/(Math.sqrt(defaultArea.length))); // side of a single area tile

module.exports = function(err, socket, session) {
  if (!session || !session.user || !session.character) {
    socket.disconnect();
    return;
  }

  socket.join('area_name');

  socket.on('getmap', function(data) {
    socket.emit('getmap', {areamap: defaultArea});
  });

  socket.on('move', function(data) {
    Character.find(session.character).success(function(c) {
      if (data.xpos >= 0 && data.xpos < AREA_WIDTH && data.ypos >= 0 && data.ypos < AREA_HEIGHT) {
        c.xpos = data.xpos;
        c.ypos = data.ypos;
        c.save();
        io.sockets.in('area_name').emit('move', { name: c.name, xpos: c.xpos, ypos: c.ypos });
      }
    });
  });

  socket.on('name', function(data) {
    Character.find(session.character).success(function(c) {
      socket.emit('name', {name: c.name});
    });
  });

  socket.on('disconnect', function() {
  });

  /* TESTING */
  socket.on('getbattlers', function(data) {
    Character.find(session.character).success(function(c) {
      socket.emit('getbattlers', { character: c, monster: data.monster });
    });
  });
}
