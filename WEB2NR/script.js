console.log("Hackerman!\nIf you got this far, you probably know how to look at the code, so I'll just tell you. There's a variable called auto. If you set it to true, the game will play itself for you. Might be helpful without a real mouse!");

var auto = false;
var pause = true;
var start = false;
var hasStarted = false;
var revealString = "32x^2 - 2476.667776x = -34283.41115 ";
var revealed = [];
for (var i = 0; i < revealString.length; i++) {revealed[i] = false;}

function drawLoop () {
	ctx.clearRect(0,0,500,500);
	ctx.fillRect(player.X - (player.width / 2), player.Y - (player.height / 2), player.width, player.height);
	ctx.fillRect(opponent.X - (opponent.width / 2), opponent.Y - (opponent.height / 2), opponent.width, opponent.height);
	drawCircle(ball.X, ball.Y, ball.radius);
	var drawString = "";
	var alldone = true;
	for (var i = 0; i < 35; i++) {
		if (revealed[i]) {
			drawString += revealString.substr(i,1);
		} else {
			drawString += "_";
			alldone = false;
		}
	}
	if (alldone) {pause = false;}
	document.getElementById("equation").innerHTML = drawString;
}
var player = {
	X: 50,
	Y: 10,
	YVel: 0,
	YmaxVel: 10,
	Yaccel: 0.5,
	height: 50,
	width: 10,
	color: "black"
};
var opponent = {
	X: 450,
	Y: 10,
	YVel: 0,
	YmaxVel: 10,
	Yaccel: 0.5,
	height: 50,
	width: 10,
	color: "black"
};
var ball = {
	X: 250,
	Y: 250,
	XVel: 5,
	YVel: 3,
	radius: 10,
	color: "black"
};

var speedEdit = 0.5;

var bodyRect = document.body.getBoundingClientRect(),
    elemRect = document.getElementById("theCanvas").getBoundingClientRect(),
    offset   = elemRect.top - bodyRect.top;

function reset() {
	start = false;
	hasStarted = false;
	document.getElementById("tutorialH2").innerHTML = "Move the mouse over the canvas or<br />place your finger on the slider to start";
	document.getElementById("equation").innerHTML = "loading...";
	for (var i = 0; i < revealString.length; i++) { revealed[i] = false; }
	player = {
		X: 50,
		Y: 10,
		YVel: 0,
		YmaxVel: 10,
		Yaccel: 0.5,
		height: 50,
		width: 10,
		color: "black"
	};
	opponent = {
		X: 450,
		Y: 10,
		YVel: 0,
		YmaxVel: 10,
		Yaccel: 0.5,
		height: 50,
		width: 10,
		color: "black"
	};
	ball = {
		X: 250,
		Y: 250,
		XVel: 5,
		YVel: 3,
		radius: 10,
		color: "black"
	};
	ctx.clearRect(0, 0, 500, 500);
}

document.addEventListener("mousemove", function (e) {
	//console.log((e.clientX - elemRect.left) + " " + (e.clientY - elemRect.top));
	player.Y = (e.clientY - elemRect.top);
});

document.getElementById("theCanvas").addEventListener("mousemove", function (e) {
	//console.log((e.clientX - elemRect.left) + " " + (e.clientY - elemRect.top));
	start = true;
});

document.getElementById("touchcontrols").addEventListener("input", function (e) {
	//console.log((e.clientX - elemRect.left) + " " + (e.clientY - elemRect.top));
	//console.log("input!!!!");
	start = true;
	player.Y = document.getElementById("touchcontrols").value;
});

function reveal () {
	var ok;
	do {
		var random = Math.round(Math.random() * (revealString.length - 1));
		ok = revealed[random];
		revealed[random] = true;
		//console.log(revealed);
	} while (ok);
}
function gameLoop() {
	if (start) {
		if (!hasStarted) {
			hasStarted = true;
			document.getElementById("tutorialH2").innerHTML = "<br><br>";
		}
		if (pause) {
			ball.X += ball.XVel;
			ball.Y += ball.YVel;
			opponent.Y += opponent.YVel;
			if (auto) {
				player.Y += player.YVel;
				//player.Y = ball.Y;
			}

			//Clipping
			if (player.Y < 0) {
				player.Y = 0;
				player.YVel = 0;
			}
			if (opponent.Y < 0) {
				opponent.Y = 0;
				opponent.YVel = 0;
			}
			if (player.Y > 500) {
				player.Y = 500;
				player.YVel = 0;
			}
			if (opponent.Y > 500) {
				opponent.Y = 500;
				opponent.YVel = 0;
			}

			//Scoring
			if (ball.X < 25) {
				//opponent point!
				//location.reload(false);
				reset();
				return;
			} else if (ball.X > 475) {
				//player point!
				ball.XVel = -1.01 * Math.abs(ball.XVel);
				ball = {
					X: 250,
					Y: 250,
					XVel: -5,
					YVel: 2,
					radius: 10,
					color: "black"
				};
				reveal();
			}

			//Ball physics
			if (ball.Y < ball.radius || ball.Y > 500 - ball.radius) {
				ball.YVel *= -1;
			}
			if (((((ball.Y - ball.radius < player.Y + (player.height / 2)) &&
				(ball.Y + ball.radius > player.Y - (player.height / 2))))) &&
				((((ball.X - ball.radius < player.X + (player.width / 2)) &&
					(ball.X + ball.radius > player.X - (player.width / 2)))))
			) {
				ball.XVel = 1.01 * Math.abs(ball.XVel);
				if (!auto) {
					reveal();
				}
			}
			if (((((ball.Y - ball.radius < opponent.Y + (opponent.height / 2)) &&
				(ball.Y + ball.radius > opponent.Y - (opponent.height / 2))))) &&
				((((ball.X - ball.radius < opponent.X + (opponent.width / 2)) &&
					(ball.X + ball.radius > opponent.X - (opponent.width / 2)))))
			) {
				ball.XVel = -1.01 * Math.abs(ball.XVel);
				reveal();
			}

			//AI
			if ((ball.Y + ball.radius) < (opponent.Y - (opponent.height / 2))) {
				//move up (Y-)
				opponent.YVel = Math.min(opponent.YmaxVel, opponent.YVel - opponent.Yaccel * Math.pow(Math.abs(opponent.Y - ball.Y) / 10, speedEdit));
			} else if ((ball.Y - ball.radius) > (opponent.Y + (opponent.height / 2))) {
				//move down (Y+)
				opponent.YVel = Math.min(opponent.YmaxVel, opponent.YVel + opponent.Yaccel * Math.pow(Math.abs(opponent.Y - ball.Y) / 10, speedEdit));
			} else {
				opponent.YVel = opponent.YVel / 1.01;
			}
			if ((ball.Y + ball.radius) < (player.Y - (player.height / 2))) {
				//move up (Y-)
				player.YVel = Math.min(player.YmaxVel, player.YVel - player.Yaccel * Math.pow(Math.abs(player.Y - ball.Y) / 10, speedEdit));
			} else if ((ball.Y - ball.radius) > (player.Y + (player.height / 2))) {
				//move down (Y+)
				player.YVel = Math.min(player.YmaxVel, player.YVel + player.Yaccel * Math.pow(Math.abs(player.Y - ball.Y) / 10, speedEdit));
			} else {
				player.YVel = player.YVel / 1.01;
			}

			drawLoop();
		} else {
			document.getElementById("quickCSS").innerHTML = "#theCanvas {display: none}#touchcontrols {display:none}";
		}
	}
}

setInterval(gameLoop, 16);