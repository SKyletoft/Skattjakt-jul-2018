console.log("hi?");

function go () {
	var input = document.getElementById("textbox").value;
	console.log(input);
	input = input.toLowerCase();
	if (input.match(/norra/) || input === "nr")) {
		console.log("norra real found");
	} else {
		//everyone else, at the moment
	}
}