

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
async function clearServices_i(){
	return localStorage.removeItem("services_itunes");
}
async function clearCc_i(){
	return localStorage.removeItem("cc_itunes");
}
async function clearPeople_i(){
	return localStorage.removeItem("people_itunes");
}
async function clearCal_i(){
	return localStorage.removeItem("cal_itunes");
}
async function clearCheck_i(){
	return localStorage.removeItem("check_itunes");
}
async function clearHead_i(){
	return localStorage.removeItem("head_itunes");
}
async function clearMs_i(){
	return localStorage.removeItem("ms_itunes");
}
async function refreshPage() {
	location.reload(true);
}
async function chooseTab() {
	openTab(event, 'apps');
}


// /* THIS IS WHERE WE GET THE APPLE STORE VERSIONS  */

// const api_url="https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=";

// async function services(){
// 	const fri=await fetch(api_url+"327370808"),latitude=(await fri.json()).results[0].version;
// 	document.getElementById("services").textContent=latitude
// }

// async function cca(){
// 	const fri=await fetch(api_url+"1357742931"),latitude=(await fri.json()).results[0].version;
// 	document.getElementById("cc").textContent=latitude
// }

// async function people(){
// 	const fri=await fetch(api_url+"1029697457"),latitude=(await fri.json()).results[0].version;
// 	document.getElementById("people").textContent=latitude
// }

// async function calendar(){
// 	const fri=await fetch(api_url+"784966220"),latitude=(await fri.json()).results[0].version;
// 	document.getElementById("cal").textContent=latitude
// }

// async function checkins(){
// 	const fri=await fetch(api_url+"864291358"),latitude=(await fri.json()).results[0].version;
// 	document.getElementById("check").textContent=latitude
// }

// async function headcounts(){
// 	const fri=await fetch(api_url+"1215339253"),latitude=(await fri.json()).results[0].version;
// 	document.getElementById("head").textContent=latitude
// }

// async function music(){
// 	const fri=await fetch(api_url+"368561278"),latitude=(await fri.json()).results[0].version;
// 	document.getElementById("ms").textContent=latitude
// }


// services()
// cca()
// people()
// calendar()
// checkins()
// headcounts()
// music()


// SERVICES
if (getWithExpiry("services_android") != null) {
	const version = getWithExpiry("services_android");
	document.getElementById("services2").textContent = version;
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
	}
	services_a();	
}

if (getWithExpiry("services_itunes") != null) {
	const version = getWithExpiry("services_itunes");
	document.getElementById("services").textContent = version;
} else {
	async function services() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/327370808.json?country=US";
		let username = "5bfe013167c034b97875e2c4d1b5d5ff6d4946a5"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
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
		document.getElementById("services").textContent = sav_f;
		setWithExpiry("services_itunes", sav_f, 6, today.toLocaleDateString("en-US", options));
	}
	services();	
}



// CHUCH CENTER
if (getWithExpiry("cc_android") != null) {
	const version = getWithExpiry("cc_android");
	document.getElementById("cc2").textContent = version;
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
	}
	cc_a();	
}

if (getWithExpiry("cc_itunes") != null) {
	const version = getWithExpiry("cc_itunes");
	document.getElementById("cc").textContent = version;
} else {
	async function cc() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/1357742931.json?country=US";
		let username = "ef27fcaf1dc326463e193367c6722672a23aaa1d"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("cc").textContent = sav_f;
		setWithExpiry("cc_itunes", sav_f, 6, time);
	}
	cc();	
}



// PEOPLE
if (getWithExpiry("people_android") != null) {
	const version = getWithExpiry("people_android");
	document.getElementById("people2").textContent = version;
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
	}
	people_a();	
}

if (getWithExpiry("people_itunes") != null) {
	const version = getWithExpiry("people_itunes");
	document.getElementById("people").textContent = version;
} else {
	async function people() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/1029697457.json?country=US";
		let username = "7c54b11fafa2e3dc7acbf565c36d6606d3b58bc3"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("people").textContent = sav_f;
		setWithExpiry("people_itunes", sav_f, 6, time);
	}
	people();	
}



// CALENDAR
if (getWithExpiry("cal_android") != null) {
	const version = getWithExpiry("cal_android");
	document.getElementById("cal2").textContent = version;
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
	}
	calendar_a();	
}

if (getWithExpiry("cal_itunes") != null) {
	const version = getWithExpiry("cal_itunes");
	document.getElementById("cal").textContent = version;
} else {
	async function calendar() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/784966220.json?country=US";
		let username = "ce32a0f2338142c3f09f7d57b08d75ea1bc53f93"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("cal").textContent = sav_f;
		setWithExpiry("cal_itunes", sav_f, 6, time);
	}
	calendar();	
}


// CHECK INS
if (getWithExpiry("check_android") != null) {
	const version = getWithExpiry("check_android");
	document.getElementById("check2").textContent = version;
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
	}
	check_a();	
}

if (getWithExpiry("check_itunes") != null) {
	const version = getWithExpiry("check_itunes");
	document.getElementById("check").textContent = version;
} else {
	async function check() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/864291358.json?country=US";
		let username = "d49e3d497c17d0db8bd2c4bfb11b14ad40c39b5b"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("check").textContent = sav_f;
		setWithExpiry("check_itunes", sav_f, 6, time);
	}
	check();	
}


// HEADCOUNTS
if (getWithExpiry("head_android") != null) {
	const version = getWithExpiry("head_android");
	document.getElementById("head2").textContent = version;
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
	}
	head_a();	
}

if (getWithExpiry("head_itunes") != null) {
	const version = getWithExpiry("head_itunes");
	document.getElementById("head").textContent = version;
} else {
	async function head() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/1215339253.json?country=US";
		let username = "5d569e6984b43c340e8604228e98c8522e566507"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("head").textContent = sav_f;
		setWithExpiry("head_itunes", sav_f, 6, time);
	}
	head();	
}


// MUSIC STAND
if (getWithExpiry("ms_android") != null) {
	const version = getWithExpiry("ms_android");
	document.getElementById("ms2").textContent = version;
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
	}
	ms_a();	
}

if (getWithExpiry("ms_itunes") != null) {
	const version = getWithExpiry("ms_itunes");
	document.getElementById("ms").textContent = version;
} else {
	async function ms() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/368561278.json?country=US";
		let username = "1bd7f31dc71433afdef628b21cafd13aa1d1cb98"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("ms").textContent = sav_f;
		setWithExpiry("ms_itunes", sav_f, 6, time);
	}
	ms();	
}

if (getWithExpiryUpdated("services_android") != null) {
		async function updateda() {
			var upd = getWithExpiryUpdated("services_android");
			document.getElementById("updatedat").textContent = upd;
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
	}

async function services_refresh_i() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/327370808.json?country=US";
		let username = "5bfe013167c034b97875e2c4d1b5d5ff6d4946a5"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
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
		document.getElementById("services").textContent = sav_f;
		setWithExpiry("services_itunes", sav_f, 6, today.toLocaleDateString("en-US", options));
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
	}

async function cc_refresh_i() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/1357742931.json?country=US";
		let username = "ef27fcaf1dc326463e193367c6722672a23aaa1d"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("cc").textContent = sav_f;
		setWithExpiry("cc_itunes", sav_f, 6, time);
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
	}

async function people_refresh_i() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/1029697457.json?country=US";
		let username = "7c54b11fafa2e3dc7acbf565c36d6606d3b58bc3"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("people").textContent = sav_f;
		setWithExpiry("people_itunes", sav_f, 6, time);
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
	}

async function calendar_refresh_i() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/784966220.json?country=US";
		let username = "ce32a0f2338142c3f09f7d57b08d75ea1bc53f93"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("cal").textContent = sav_f;
		setWithExpiry("cal_itunes", sav_f, 6, time);
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
	}

async function check_refresh_i() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/864291358.json?country=US";
		let username = "d49e3d497c17d0db8bd2c4bfb11b14ad40c39b5b"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("check").textContent = sav_f;
		setWithExpiry("check_itunes", sav_f, 6, time);
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
	}

async function head_refresh_i() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/1215339253.json?country=US";
		let username = "5d569e6984b43c340e8604228e98c8522e566507"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("head").textContent = sav_f;
		setWithExpiry("head_itunes", sav_f, 6, time);
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
	}

async function ms_refresh_i() {
		let s_i_api_url="https://api.appmonsta.com/v1/stores/itunes/details/368561278.json?country=US";
		let username = "1bd7f31dc71433afdef628b21cafd13aa1d1cb98"
		let password = "x"
		let authString = `${username}:${password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		const req = await fetch(s_i_api_url,{method: 'GET', headers: headers});
		const res = await req.json();
		const sav = res.version;
		if (sav.includes('Varies')) { 
			var sav_f = "Varies"
		} else { 
			var sav_f = sav
		};
		var time = Date.now();
		document.getElementById("ms").textContent = sav_f;
		setWithExpiry("ms_itunes", sav_f, 6, time);
	}

function clearLocalStorage() {
	clearServices();
	clearCc();
	clearPeople();
	clearCal();
	clearCheck();
	clearHead();
	clearMs();
	clearServices_i();
	clearCc_i();
	clearPeople_i();
	clearCal_i();
	clearCheck_i();
	clearHead_i();
	clearMs_i();
	services_refresh();
	cc_refresh();
	people_refresh();
	calendar_refresh();
	check_refresh();
	head_refresh();
	ms_refresh();
	services_refresh_i();
	cc_refresh_i();
	people_refresh_i();
	calendar_refresh_i();
	check_refresh_i();
	head_refresh_i();
	ms_refresh_i();
	document.getElementById("updatedat").textContent = "Now";
}