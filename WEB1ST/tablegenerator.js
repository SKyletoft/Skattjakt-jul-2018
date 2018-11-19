var tablegenerator = function (width, height) {
	var output = "";
	for (var i = 1; i < height; i++) {
		output += "<tr>";
		for (var j = 1; j < width; j++) {
			output += '<td id="H' + i + 'W' + j + '"></td>'; 
		}
		output += "</tr>";
	}
	return output;
}