const b = "&#128163;";
const mineField = [
	["","","",1,b,b,1,1,b,1],
	["","","",1,2,2,1,1,1,1],
	["","","","","","","","","",""],
	["","","","","",1,1,2,1,1],
	[1,1,"","","",1,b,2,b,1],
	[b,2,1,1,"",1,1,2,1,1],
	[3,4,b,1,"","","","","",""],
	[b,b,2,1,"","","","","",""],
	[b,3,1,"","","","","","",""]
];
const correctAnswers = [
	[true, true, true, true, false, false, true, true, false],
	[true, true, true, true, true, true, true, true, true],
	[true, true, true, true, true, true, true, true, true],
	[true, true, true, true, true, true, true, true, true],
	[true, true, true, true, true, true, false, true, false],
	[false, true, true, true, true, true, true, true, true],
	[true, true, false, true, true, true, true, true, true],
	[false, false, true, true, true, true, true, true, true],
	[false, true, true, true, true, true, true, true, true]
];
var opened = [];
var backlog = [];
var tried = [];
var ignore = false;
var ended = false;
function htmlID (x, y) {
	return "H" + x + "W" + y;
}
function coords (id) {
	var Wco = id.indexOf("W");
	return [
		parseInt(id.substring(1,Wco)),
		parseInt(id.substring(Wco+1))
	];
}
function boom () {
	document.getElementById("everything").innerHTML="BOOM!\nBörjar om om 10 sekunder...";
	setTimeout(location.reload(),10000);
}
function compareAnswers () {
	for (var i = 0; i < correctAnswers.length; i++) {
		for (var j = 0; j < correctAnswers[i].length; j++) {
			if (correctAnswers[i][j] != opened[i][j]) {
				return false;
			}
		}
	}
	return true;
}
function openBacklog () {
	console.log("openBacklog is starting\n"+backlog+"\n"+tried+"\nare the lists used");
	if (!ignore) {
		while (backlog.length > 0) {
			ignore = true;
			var toVerify = coords(backlog[0]);
			if (tried.indexOf(backlog[0]) === -1) {
				if (toVerify[0] < 10 && toVerify[1] < 9) {
					document.getElementById(backlog[0]).click();
				} else {
					console.log("failed: " + toVerify);
					console.log(backlog + "\n" + tried);
					tried[tried.length] = backlog[0];
				}
			} else {
				console.log(backlog[0] + " is already on the tried list");
			}
			tried[tried.length] = backlog[0];
			backlog.splice(0, 1);
		}
		ignore = false;
	}
	if (compareAnswers()) {
		ended = true;
		document.getElementById("everything").innerHTML="Grattis!<br><i>Se till att vara p&#229; en dator och inte en mobil/surfplatta!</i><br><a href=\"https://goo.gl/ejRxNu\">https://goo.gl/ejRxNu</a>";
		
	}
}
$(document).ready(function () {
	for (var i = 0; i < 9; i++) {
		opened[i] = new Array;
		for (var j = 0; j < 9; j++) {
			opened[i][j] = false;
			document.getElementById(htmlID(i,j)).className = "closed";
		}
	}
	$("td").click(function () {
		if (!ended) {
			console.clear();
			var id = $(this).attr('id');
			var localCoords = coords(id);
			//console.log(localCoords);
			opened[localCoords[0]][localCoords[1]] = true;
			document.getElementById(id).className = "open";
			document.getElementById(id).innerHTML = mineField[localCoords[0]][localCoords[1]];
			if (mineField[localCoords[0]][localCoords[1]] === b) {
				boom();
			} else if (mineField[localCoords[0]][localCoords[1]] === "") {
				//if (!ignore) {
					var directions = [
						[-1,0],
						[1,0],
						[0,-1],
						[0,1],
						[1,1],
						[1,-1],
						[-1,1],
						[-1,-1]
					];
					for (var i = 0; i < directions.length; i++) {
						var x = localCoords[0] + directions[i][0];
						var y = localCoords[1] + directions[i][1];
						//console.log(x + ", " + y);
						if ((x >= 0 && x < 10) && (y >= 0 && x < 10)) {
							if (backlog.indexOf(htmlID(x,y)) === -1) {
								if (tried.indexOf(htmlID(x,y)) === -1) {
									//console.log(htmlID(x,y) + " " + x + " " + y + " " + typeof(x) + " " + typeof(y));
									backlog[backlog.length] = htmlID(x,y);
								} else {
									console.log(htmlID(x,y) + " is on the tried list!\n" + tried);
								}
							} else {
								console.log(htmlID(x,y) + " is on the backlog list!\n" + backlog);
							}
						} else {
							console.log(x + " or " + y + "failed the within bound check");
						}
					}
				//}
			}
			openBacklog();
		}
	});
});

//TO REMOVE ITEM
/*
var array = [2, 5, 9];
console.log(array)
var index = array.indexOf(5);
if (index > -1) {
  array.splice(index, 1);
}
*/