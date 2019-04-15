var five = require("johnny-five");
var board = new five.Board();
var robot = require("robotjs");

var numHits = 0;
var newHit = true;

board.on("ready", function() {
  var sensor = new five.Sensor("A0");
  
  // Scale the sensor's data from 0-1023 to 0-10 and log changes
  sensor.on("change", function() {
    robot.typeString(" ");
   // console.log(this.fscaleTo(0, 10));

    if(this.fscaleTo(0, 10) > 1 && newHit) {
      newHit = false;
      numHits++;
      console.log(numHits);
    }

    if(this.fscaleTo(0, 10) <= 0.01) {
      newHit = true;
    }
  });
});