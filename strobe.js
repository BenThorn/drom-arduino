var five = require("johnny-five");
// board = new five.Board();
var boards = new five.Boards(["A", "B"]);

var robot = require("robotjs");

var numHits = 0;
var newHit = true;

var nextHit = false;

boards.on("ready", function() {

  boards.each(function(board){
    console.log(board.id);
    var sensor = new five.Sensor({
      pin: "A0",
      board: board
    });
  
    // Scale the sensor's data from 0-1023 to 0-10 and log changes
    sensor.on("change", function() {
       console.log(this.fscaleTo(0, 100));
  
      if(this.fscaleTo(0, 100) > 4 && newHit) {
        if(board.id === "A") {
          robot.typeString(" ");
        } else if(board.id === "B") {
          robot.typeString("v");
        }
        nextHit = false;
        newHit = false;
        numHits++;
        console.log(numHits + " HITS" + board.id);
  
      }                       
   
      if(this.fscaleTo(0, 100) === 0) {        
        nextHit = false;
        newHit = true;
      }
    });
  });
});