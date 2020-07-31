
/*  THIS IS WHERE WE SETUP THE COOKIE FUNCTIONS  */

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 4 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
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
if (getCookie("services-android") != '') {
   const latitude = getCookie("services-android");
   document.getElementById("services2").textContent = latitude;
   console.log("Services From Cookie");
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
		console.log("Services from API");
			document.getElementById("services2").textContent = sav_f;
			setCookie("services-android", sav_f, 1);
	}
	services_a()
}


// CHUCH CENTER
if (getCookie("cc-android") != '') {
   const latitude = getCookie("cc-android");
   document.getElementById("cc2").textContent = latitude;
   console.log("Church Center From Cookie");
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
			console.log("Church Center from API");
			document.getElementById("cc2").textContent = sav_f;
			setCookie("cc-android", sav_f, 1);
	}
	cc_a()
}


// PEOPLE
if (getCookie("people-android") != '') {
   const latitude = getCookie("people-android");
   document.getElementById("people2").textContent = latitude;
   console.log("People From Cookie");
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
			console.log("People from API");
			document.getElementById("people2").textContent = sav_f;
			setCookie("people-android", sav_f, 1);
	}
	people_a()
}


// CALENDAR
if (getCookie("cal-android") != '') {
   const latitude = getCookie("cal-android");
   document.getElementById("cal2").textContent = latitude;
   console.log("Calendar From Cookie");
} else {
	async function cal_a() {
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
			console.log("Calendar from API");
			document.getElementById("cal2").textContent = sav_f;
			setCookie("cal-android", sav_f, 1);
	}
	cal_a()
}


// CHECK INS
if (getCookie("check-android") != '') {
   const latitude = getCookie("check-android");
   document.getElementById("check2").textContent = latitude;
   console.log("Checkins From Cookie")
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
			console.log("Checkins from API");
			document.getElementById("check2").textContent = sav_f;
			setCookie("check-android", sav_f, 1);
	}
	check_a()
}


// HEADCOUNTS
if (getCookie("headcounts-android") != '') {
   const latitude = getCookie("headcounts-android");
   document.getElementById("head2").textContent = latitude;
   console.log("Headcounts From Cookie")
} else {
	async function headcounts_a() {
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
			console.log("Headcounts from API");
			document.getElementById("head2").textContent = sav_f;
			setCookie("headcounts-android", sav_f, 1);
	}
	headcounts_a()
}


// MUSIC STAND
if (getCookie("ms-android") != '') {
   const latitude = getCookie("ms-android");
   document.getElementById("ms2").textContent = latitude;
   console.log("Music Stand From Cookie")
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
			console.log("Music Stand from API");
			document.getElementById("ms2").textContent = sav_f;
			setCookie("ms-android", sav_f, 1);
	}
	ms_a()
}
