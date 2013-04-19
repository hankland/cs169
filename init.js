Character = require('./models').Character;
Monster = require('./models').Monster;

/* Initialize some areas. */
function initializeAreas() {
  console.log("init.js: Initializing areas...");
  Area.create({name: "Area1", description: "The starting location!", areamap: "AAAAAAAAA"});
  Area.create({name: "Area2", description: "A new location!", areamap: "AAAAAAAAA"});
  Area.create({name: "Area3", description: "An unexplored land...", areamap: "AAAAAAAAA"});
}

/* Initialize some monster types. */
function initializeMonsters() {
  console.log("init.js: Initializing monsters...");
  Monster.create({name: "Spider", description: "An angry bug.", experience: 2, health_points: 5, magic_points: 0, physical_attack: 1, magic_attack: 0, physical_defense: 0, magic_defense: 0}).success(function f(m) {
    // do something
  });
  Monster.create({name: "Ghost", description: "A spooky ghost.", experience: 5, health_points: 10, magic_points: 10, physical_attack: 1, magic_attack: 1, physical_defense: 0, magic_defense: 0}).success(function f(m) {
    // do something
  });
  Monster.create({name: "Big Ghost", description: "An even spookier ghost.", experience: 10, health_points: 25, magic_points: 10, physical_attack: 3, magic_attack: 1, physical_defense: 0, magic_defense: 0}).success(function f(m) {
    // do something
  });
  Monster.create({name: "Troll", description: "An ugly troll.", experience: 7, health_points: 15, magic_points: 5, physical_attack: 3, magic_attack: 1, physical_defense: 1, magic_defense: 1}).success(function f(m) {
    // do something
  });
}

