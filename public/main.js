
var socket = io();
var height;
var width;
var Visualizer;

$(function() {
	height = $(window).height();
	width = $(window).width();
	Visualizer = new Visualizer();
	socket.on('update', function (data) {
	  Visualizer.updatePoints(data.buffer);
	});
});
// Whenever the server emits 'login', log the login message
socket.on('beat', function (data) {
  beat(data.power);
});




var beats = 0;

function beat(power) {
  beats += power;
}


// setInterval( function() {
//   var colorString =  "rgb(0," + (parseInt(255 * ( beats / 25))) + "," + (parseInt(255 * (beats / 25))) + ")";
//   $("body").css({"background-color": colorString});
//   beats *= .80;
//   beats -= 1;
//   if(beats < 0) beats = 0;
// }, 120)


function Visualizer () {
	this.paper = new Raphael(0, 0, width, height);
	this.createPoints(64);
}

Visualizer.prototype.createPoints = function(numberOfPoints) {
	this.yPosition = parseInt(height/2);
	this.middleLine = this.paper.rect(0,this.yPosition - 1, width, 2).attr({fill : "#555", 'stroke-opacity' : 0})
	this.xDiff = width/numberOfPoints;
	var pathString = "M0," + this.yPosition;
	this.numberOfPoints = numberOfPoints;
	for(var i = 0; i < this.numberOfPoints; i++) {
		pathString += "L" + this.xDiff * i + ',' +  this.yPosition
	}
	this.path = this.paper.path(pathString).attr({'stroke' : '#e33571', 'stroke-width' : this.xDiff});
}

Visualizer.prototype.updatePoints = function(buffer) {
	var pathString = "M0," + this.yPosition;
	for(var i = 0; i < this.numberOfPoints; i++) {
		pathString += "L" + this.xDiff * i + ',' +  this.yPosition;
		pathString += "L" + this.xDiff * i + ',' +  parseInt(this.yPosition + buffer[i] * 10);
		pathString += "L" + this.xDiff * i + ',' +  this.yPosition;
	}
	this.path.attr({path :  pathString});
}