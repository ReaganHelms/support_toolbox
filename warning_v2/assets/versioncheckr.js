function setup() {
	loadJSON("http://itunes.apple.com/lookup?id=327370808", gotData, "jsonp");	
}

function gotData(data) {
	println(data);

	let d = (data); 
}

document.body.innerHTML = d