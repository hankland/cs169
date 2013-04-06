Character = require('./models').Character;
Monster = require('./models').Monster;

Character.create({ name: "char1", xpos:0, ypos:0 }).success(function f(c) {

});
