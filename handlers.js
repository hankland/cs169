User = require('./models').User;
Area = require('./models').Area;
Class = require('./models').Class;
Character = require('./models').Character;

module.exports = function(err, socket, session) {
  if (!session || !session.user ) { //|| !session.character) {
    socket.disconnect();
    return;
  }

  socket.join('area_name');

  socket.on('getmap', function(data) {
    areamap = "ACBAABACCBBABCAAABBABAABC";
    socket.emit('getmap', {areamap: areamap});
  });

  socket.on('move', function(data) {
    Character.find(1).success( function(c) {
      if (data.xpos >= 0 && data.xpos < 5 && data.ypos >= 0 && data.ypos < 5) {
        c.xpos = data.xpos;
        c.ypos = data.ypos;
        c.save();
        io.sockets.in('area_name').emit('move', { name: c.name, xpos: c.xpos, ypos: c.ypos});
      }
    });
  });
  socket.on('name', function(data) {
    Character.find(1).success( function(c) {
      socket.emit('name', {name: c.name});
    });
  });
  socket.on('disconnect', function() {
  });

}
