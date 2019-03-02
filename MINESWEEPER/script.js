mines[1][7] = true;
mines[2][7] = true;
mines[2][9] = true;
mines[3][4] = true;
mines[4][7] = true;
mines[5][3] = true;
mines[7][8] = true;
mines[9][2] = true;

var open = [[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false]];

var display = [[],[],[],[],[],[],[],[],[],[]];

function htmlID (x, y) {
	return "H" + x + "W" + y;
}

function floodFill