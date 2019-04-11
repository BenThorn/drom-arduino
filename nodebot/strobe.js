var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var sensor = new five.Sensor("A0");
  
  // Scale the sensor's data from 0-1023 to 0-10 and log changes
  sensor.on("change", function() {
    console.log(this.fscaleTo(0, 10));
  });
});