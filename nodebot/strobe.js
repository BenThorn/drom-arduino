var five = require("johnny-five");
var board = new five.board();

//bool to trigger when sensor changes
var hit1 = false;
//added lines to account for multiples
/*var boards = new five.Boards(["A", "B", "C"]);
var hit2 = false;
var hit3 = false;
*/


board.on("ready", function() {
	
	//added some code for when more boards are added
	/*
	//find boards by label
	var led = new five.Led({
		pin: 13,
		board: this.byId("A")
	});
	
	led.blink();
	
	this.each(function(board){
		if(board.id === "B"){
			//initialize an led instance on pin 13 of each initialized board and strobe it.
			var led = new five.Led({
				pin: 13,
				board: board
			});
			led.blink();
		}		
	});
	*/
  var sensor = new five.Sensor("A0");
  
  // Scale the sensor's data from 0-1023 to 0-10 and log changes
  sensor.on("change", function() {
    console.log(this.fscaleTo(0, 10));
		hit1 = true;
  });
});