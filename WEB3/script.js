console.log("hi?");

function go () {
	var input = document.getElementById("textbox").value;
	console.log(input);
	input = input.toLowerCase();
	switch (input) {
		case "enkelt första steg":
		case "enkelt förstasteg":
		case "enkeltförstasteg":
		case "enkelt forsta steg":
		case "enkelt forstasteg":
		case "enkeltforstasteg":
			location="../WEB1NR/index.htm";
			break;
		case "b":
			location="../WEB1OR/index.htm";
			break;
		case "c":
			location="../WEB1RU/index.htm";
			break;
		case "d":
			location="../WEB1ST/index.htm";
			break;
		default:
			alert("Fel, tyvärr\nÄr du helt säker att du har skrivit rätt?");
			break;
	}
}