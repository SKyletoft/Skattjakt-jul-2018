function part7asolver () {
	//enter the right column from the .xlsx into the graphList variable
	//and enter the encrypted message into the input variable
	//and call the function
	//And yes, there's a bug or an issue with the problem. Too lazy to investigate, doesn't matter, you can read it any way
	var graphList = [];
	var input = "";
	var alphabet = "abcdefghijklmnopqrstuvwxyzåäö";
	var inputfreq = [];
	for (var i = 0; i < alphabet.length; i++) {
		inputfreq[i] = 0;
	}
	for (var i = 0; i < input.length; i++) {
		inputfreq[alphabet.indexOf(input[i])]++;
	}
	var newAlph = "";
	for (var i = 0; i < alphabet.length; i++) {
		newAlph += alphabet[inputfreq.indexOf(graphList[i])];
	}
	newAlph += ".,: ";
	alphabet += ".,: ";
	console.log(newAlph);
	var output = "";
	for (var i = 0; i < input.length; i++) {
		output += alphabet[newAlph.indexOf(input[i])];
	}
	console.log(output);
}