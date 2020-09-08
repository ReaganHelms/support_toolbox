

function setKey(key, val) {
  return localStorage.setItem(key, val);
};

function getKey(key) {
  return localStorage.getItem(key);
};

function setWithExpiry(key, value, ttl, update) {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + (ttl * 60 * 60 * 1000), //This is the number of hours till expiry
		updated: update,
	}
	return localStorage.setItem(key, JSON.stringify(item))
};

function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

function getWithExpiryUpdated(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	
	return item.updated
}

async function clearServices(){
	return localStorage.removeItem("services_android");
}
async function clearCc(){
	return localStorage.removeItem("cc_android");
}
async function clearPeople(){
	return localStorage.removeItem("people_android");
}
async function clearCal(){
	return localStorage.removeItem("cal_android");
}
async function clearCheck(){
	return localStorage.removeItem("check_android");
}
async function clearHead(){
	return localStorage.removeItem("head_android");
}
async function clearMs(){
	return localStorage.removeItem("ms_android");
}
async function refreshPage() {
	location.reload(true);
}
async function chooseTab() {
	openTab(event, 'apps');
}


/* THIS IS WHERE WE GET THE APPLE STORE VERSIONS  */

const api_url="https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=";

async function services(){
	const fri=await fetch(api_url+"327370808"),latitude=(await fri.json()).results[0].version;
	document.getElementById("services").textContent=latitude
}

async function cca(){
	const fri=await fetch(api_url+"1357742931"),latitude=(await fri.json()).results[0].version;
	document.getElementById("cc").textContent=latitude
}

async function people(){
	const fri=await fetch(api_url+"1029697457"),latitude=(await fri.json()).results[0].version;
	document.getElementById("people").textContent=latitude
}

async function calendar(){
	const fri=await fetch(api_url+"784966220"),latitude=(await fri.json()).results[0].version;
	document.getElementById("cal").textContent=latitude
}

async function checkins(){
	const fri=await fetch(api_url+"864291358"),latitude=(await fri.json()).results[0].version;
	document.getElementById("check").textContent=latitude
}

async function headcounts(){
	const fri=await fetch(api_url+"1215339253"),latitude=(await fri.json()).results[0].version;
	document.getElementById("head").textContent=latitude
}

async function music(){
	const fri=await fetch(api_url+"368561278"),latitude=(await fri.json()).results[0].version;
	document.getElementById("ms").textContent=latitude
}


services()
cca()
people()
calendar()
checkins()
headcounts()
music()


console.log("done with ios");


// NOW WE ARE GOING TO RETURN EACH ANDROID APP, USING COOKIES WHERE POSSIBLE 

// SERVICES
if (getWithExpiry("services_android") != null) {
	const version = getWithExpiry("services_android");
	document.getElementById("services2").textContent = version;
	console.log("Services from Local Storage");
} else {
	async function services_a() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.PlanningCenter.json?country=US";
		let username = "5bfe013167c034b97875e2c4d1b5d5ff6d4946a5"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now().toLocaleString();
		var today  = new Date();
		var options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
		document.getElementById("services2").textContent = sav_f;
		setWithExpiry("services_android", sav_f, 6, today.toLocaleDateString("en-US", options));
		console.log("Services from API");
	}
	services_a();	
}



// CHUCH CENTER
if (getWithExpiry("cc_android") != null) {
	const version = getWithExpiry("cc_android");
	document.getElementById("cc2").textContent = version;
	console.log("CC from Local Storage");
} else {
	async function cc_a() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.churchcenter.json?country=US";
		let username = "ef27fcaf1dc326463e193367c6722672a23aaa1d"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("cc2").textContent = sav_f;
		setWithExpiry("cc_android", sav_f, 6, time);
		console.log("CC from API");
	}
	cc_a();	
}



// PEOPLE
if (getWithExpiry("people_android") != null) {
	const version = getWithExpiry("people_android");
	document.getElementById("people2").textContent = version;
	console.log("People from Local Storage");
} else {
	async function people_a() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.people.json?country=US";
		let username = "7c54b11fafa2e3dc7acbf565c36d6606d3b58bc3"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("people2").textContent = sav_f;
		setWithExpiry("people_android", sav_f, 6, time);
		console.log("People from API");
	}
	people_a();	
}



// CALENDAR
if (getWithExpiry("cal_android") != null) {
	const version = getWithExpiry("cal_android");
	document.getElementById("cal2").textContent = version;
	console.log("Calendar from Local Storage");
} else {
	async function calendar_a() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.resources.json?country=US";
		let username = "ce32a0f2338142c3f09f7d57b08d75ea1bc53f93"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("cal2").textContent = sav_f;
		setWithExpiry("cal_android", sav_f, 6, time);
		console.log("Calendar from API");
	}
	calendar_a();	
}


// CHECK INS
if (getWithExpiry("check_android") != null) {
	const version = getWithExpiry("check_android");
	document.getElementById("check2").textContent = version;
	console.log("Checkins from Local Storage");
} else {
	async function check_a() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.checkins.json?country=US";
		let username = "d49e3d497c17d0db8bd2c4bfb11b14ad40c39b5b"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("check2").textContent = sav_f;
		setWithExpiry("check_android", sav_f, 6, time);
		console.log("Checkins from API");
	}
	check_a();	
}


// HEADCOUNTS
if (getWithExpiry("head_android") != null) {
	const version = getWithExpiry("head_android");
	document.getElementById("head2").textContent = version;
	console.log("Headcounts from Local Storage");
} else {
	async function head_a() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.headcounts.json?country=US";
		let username = "5d569e6984b43c340e8604228e98c8522e566507"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("head2").textContent = sav_f;
		setWithExpiry("head_android", sav_f, 6, time);
		console.log("Headcounts from API");
	}
	head_a();	
}


// MUSIC STAND
if (getWithExpiry("ms_android") != null) {
	const version = getWithExpiry("ms_android");
	document.getElementById("ms2").textContent = version;
	console.log("Music Stand from Local Storage");
} else {
	async function ms_a() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.musicstand.json?country=US";
		let username = "1bd7f31dc71433afdef628b21cafd13aa1d1cb98"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("ms2").textContent = sav_f;
		setWithExpiry("ms_android", sav_f, 6, time);
		console.log("Music Stand from API");
	}
	ms_a();	
}

if (getWithExpiryUpdated("services_android") != null) {
		async function updateda() {
			var upd = getWithExpiryUpdated("services_android");
			document.getElementById("updatedat").textContent = upd;
			console.log(upd);
		}
	updateda();
} else {
	document.getElementById("updatedat").textContent = "Now";
}


//Functions to refresh local storage from API on request

async function services_refresh() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.PlanningCenter.json?country=US";
		let username = "5bfe013167c034b97875e2c4d1b5d5ff6d4946a5"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now().toLocaleString();
		var today  = new Date();
		var options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
		document.getElementById("services2").textContent = sav_f;
		setWithExpiry("services_android", sav_f, 6, today.toLocaleDateString("en-US", options));
		console.log("Services from API");
	}

async function cc_refresh() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.churchcenter.json?country=US";
		let username = "ef27fcaf1dc326463e193367c6722672a23aaa1d"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("cc2").textContent = sav_f;
		setWithExpiry("cc_android", sav_f, 6, time);
		console.log("CC from API");
	}

async function people_refresh() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.people.json?country=US";
		let username = "7c54b11fafa2e3dc7acbf565c36d6606d3b58bc3"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("people2").textContent = sav_f;
		setWithExpiry("people_android", sav_f, 6, time);
		console.log("People from API");
	}

async function calendar_refresh() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.resources.json?country=US";
		let username = "ce32a0f2338142c3f09f7d57b08d75ea1bc53f93"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("cal2").textContent = sav_f;
		setWithExpiry("cal_android", sav_f, 6, time);
		console.log("Calendar from API");
	}

async function check_refresh() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.checkins.json?country=US";
		let username = "d49e3d497c17d0db8bd2c4bfb11b14ad40c39b5b"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("check2").textContent = sav_f;
		setWithExpiry("check_android", sav_f, 6, time);
		console.log("Checkins from API");
	}

async function head_refresh() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.headcounts.json?country=US";
		let username = "5d569e6984b43c340e8604228e98c8522e566507"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("head2").textContent = sav_f;
		setWithExpiry("head_android", sav_f, 6, time);
		console.log("Headcounts from API");
	}

async function ms_refresh() {
		let s_a_api_url="https://api.appmonsta.com/v1/stores/android/details/com.ministrycentered.musicstand.json?country=US";
		let username = "1bd7f31dc71433afdef628b21cafd13aa1d1cb98"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_a_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("ms2").textContent = sav_f;
		setWithExpiry("ms_android", sav_f, 6, time);
		console.log("Music Stand from API");
	}

function clearLocalStorage() {
	clearServices();
	clearCc();
	clearPeople();
	clearCal();
	clearCheck();
	clearHead();
	clearMs();
	services_refresh();
	cc_refresh();
	people_refresh();
	calendar_refresh();
	check_refresh();
	head_refresh();
	ms_refresh();
	document.getElementById("updatedat").textContent = "Now";
}