console.log("hi?");
console.log("Please don't continue opening the dev console. You'll just ruin the fun. If you get stuck, email me for help rather than cheat, please?\n-Samuel");

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
		case "det börjar lätt":
		case "det borjar latt":
		case "detbörjarlätt":
		case "detborjarlatt":
			location="../WEB1OR/index.htm";
			break;
		case "it starts easy":
		case "itstartseasy":
			location="../WEB1RU/index.htm";
			break;
		case "an easy start":
		case "aneasystart":
			location="../WEB1ST/index.htm";
			break;
		case "morse code":
		case "morsecode":
		case "morsekod":
		case "morse kod":
		case "morse":
			location="../WEB4/index.htm"
			break;
		default:
			alert("Fel, tyvärr\nÄr du helt säker att du har skrivit rätt?");
			break;
	}
}
