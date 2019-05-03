// var five = require("johnny-five");
// var board = new five.Board();

// var robot = require("robotjs");

// var numHits = 0;
// var newHit = true;

// var nextHit = false;

// board.on("ready", function() {

//   var sensor = new five.Sensor("A0");
  
//   // Scale the sensor's data from 0-1023 to 0-10 and log changes
//   sensor.on("change", function() {
//       console.log(this.fscaleTo(0, 100));

//     if(this.fscaleTo(0, 100) > 4 && newHit) {
//       robot.typeString(" ");
//       nextHit = false;
//       newHit = false;
//       numHits++;
//       console.log(numHits + " HITS");

//     }                       
  
//     if(this.fscaleTo(0, 100) === 0) {        
//       nextHit = false;
//       newHit = true;
//     }
//   });
// });



var five = require("johnny-five");
// board = new five.Board();
var boards = new five.Boards(["A", "B", "C"]);

var robot = require("robotjs");

var numHitsA = 0;
var numHitsB = 0;
var numHitsC = 0;

var newHitA = true;
var newHitB = true;
var newHitC = true;

var nextHitA = false;
var nextHitB = false;
var nextHitC = false;

boards.on("ready", function() {

  boards.each(function(board){
    var sensor = new five.Sensor({
      pin: "A0",
      board: board
    });

    var led = new five.Led({
      pin: 13,
      board: board
    });
  
    // Scale the sensor's data from 0-1023 to 0-10 and log changes
    sensor.on("change", function() {

      //console.log(this.fscaleTo(0, 100));
      led.toggle();

      if(board.port === "COM7") {
          //console.dir(board.port);
          if(this.fscaleTo(0, 100) > 4 && newHitA) {
          robot.typeString(" ");
          nextHitA = false;
          newHitA = false;
          numHitsA++;
          console.log(numHitsA + " HITS -- BOARD: " + board.port);
        }
      
        if(this.fscaleTo(0, 100) === 0) { 
          led.off();       
          nextHitA = false;
          newHitA = true;
        }
      } else if(board.port === "COM5") {
          if(this.fscaleTo(0, 100) > 4 && newHitB) {
           // console.log(this.fscaleTo(0, 100));
            robot.typeString("b");
            nextHitB = false;
            newHitB = false;
            numHitsB++;
            console.log(numHitsB + " HITS -- BOARD: " + board.port);
          }                       
        
          if(this.fscaleTo(0, 100) === 0) {  
            led.off();
            nextHitB = false;
            newHitB = true;
          }
      } else if(board.port === "COM6") {
          if(this.fscaleTo(0, 100) > 4 && newHitC) {
            robot.typeString("v");
            nextHitC = false;
            newHitC = false;
            numHitsC++;
            console.log(numHitsC + " HITS -- BOARD: " + board.port);
          }                       
        
          if(this.fscaleTo(0, 100) === 0) {        
            led.off();
            nextHitC = false;
            newHitC = true;
          }
      }
    });
  });
});