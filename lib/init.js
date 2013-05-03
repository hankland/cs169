Character = require('./models').Character;
Monster = require('./models').Monster;

module.exports = function() {
  /* Initialize everything. */
  // initializeAreas();
  initializeMonsters();
}

/* Initialize some areas. */
function initializeAreas() {
  console.log("init.js: Initializing areas...");
  Area.create({name: "Forest", description: "A green forest.", areatype: "F", areamap:
               "FAAABBBBBBBBBBBBBBBBB" + 
                "ACAAAAAAAAAAAAAAAAAB" +
                "AAABBBBBBBBBBBBBBBAB" +
                "BAAAAAAAAAAAAAAAAAAB" +
                "BABBBBBBBBBBBBBBBBBB" + //5
                "BAAAAAAAAAAAAAAAAAAB" +
							  "BABBBBBBBBBBBBBBBBAB" +
							  "BAAAAAAAAAAAAAAAAAAB" +
							  "BAAAAABBAABBAABBBBBB" +
							  "BAAAAAAAAAAAAAAAAAAB" + //10
							  "BABBBBBBBBBBBBBBBBAB" +
							  "BAAAAAAAAAAAAAAAAAAB" +
							  "BABBBBBBBBAABBBBBBBB" +
							  "BAAAAAAAAAAAAAAAAAAB" +
							  "BABBBBBBBBBBBBBBBBAB" + //15
							  "BAAAAAAAAAAAAAAAAAAB" +
							  "BABBBBBBBBBBBBBBAAAB" +
							  "BABBBBBBBBBBBBBBAAAB" +
							  "BAAAAAAAAAAAAAAAAACB" +
							  "BBBBBBBBBBBBBBBBBBBB"}).success(function(a) {
      NPC.create({name: "Oski the Bear", xpos: 1, ypos: 0, dialogue: "Hello, player! Roaaaar."}).success(function f(n) {
        n.setArea(a);
      });
      NPC.create({name: "Voski the Squirrel", xpos: 7, ypos: 1, dialogue: "Hello, player! Glub glub."}).success(function f(n) {
        n.setArea(a);
      });
    });
  Area.create({name: "Mountain", description: "A rocky mountain", areatype: "M", areamap:
                "MAAABBBBBBBBBBBBBBBBB" + 
								 "ACAAAAAAAAAAAAAAAAAB" +
								 "AAABBBBABAABBBBBBBAB" +
								 "BAAAAAAAAAAAAAAAABAB" +
								 "BABBBBBBBAABBBBBABAB" + //5
								 "BABAAAAAAAAAAAABABAB" +
								 "BABABBBBBAABBBABABAB" +
								 "BABABAAAAAAAABABABAB" +
								 "BABABABBBAABABABABAB" +
								 "BABABABAAAABABABABAB" + //10
								 "BAAAAAAAACABABABABAB" +
								 "BABABABAAAAAAAAAAAAB" +
								 "BABABABAAAAAABABABAB" +
								 "BABABABBAABBBBABABAB" +
								 "BABABAAAAAAAAAABABAB" + //15
								 "BABABBBBAABBBBBAAAAB" +
								 "BABAAAAAAAAAAAAAAAAB" +
								 "BABBBBBBAABBBBBAAAAB" +
								 "BAAAAAAAAAAAAAAAAAAB" +
								 "BBBBBBBBBBBBBBBBBBBB"});
  Area.create({name: "Area3", description: "An unexplored land...", areatype: "X", areamap:
                 "XAAAAAAAAA"});
}

/* Initialize some monster types. */
function initializeMonsters() {
  console.log("init.js: Initializing monsters...");
  Monster.create({name: "Troll", description: "An ugly troll.", experience: 20, health_points: 15, magic_points: 5, physical_attack: 7, magic_attack: 1, physical_defense: 1, magic_defense: 1}).success(function f(m) {
    // do something
  });
  Monster.create({name: "Spider", description: "An angry bug.", experience: 5, health_points: 5, magic_points: 0, physical_attack: 1, magic_attack: 0, physical_defense: 0, magic_defense: 0}).success(function f(m) {
    // do something
  });
  Monster.create({name: "Ghost", description: "A spooky ghost.", experience: 10, health_points: 10, magic_points: 10, physical_attack: 3, magic_attack: 1, physical_defense: 0, magic_defense: 0}).success(function f(m) {
    // do something
  });
  Monster.create({name: "Big Ghost", description: "An even spookier ghost.", experience: 25, health_points: 25, magic_points: 10, physical_attack: 6, magic_attack: 1, physical_defense: 0, magic_defense: 0}).success(function f(m) {
    // do something
  });
}

function initializeNPCs() {
  NPC.create({name: "Oski the Bear", dialogue: "Hello, player! Roaaaar."}).success(function f(n) {
    // do something
  });
  NPC.create({name: "Voski the Turtle", dialogue: "Hello, player! Glub glub."}).success(function f(n) {
    // do something
  });
}
