

// TO ADD THE TABBED NAVIGATION

function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tab-content");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}


// THIS IS FOR THE APP VERSION CHECKER

const api_url = 'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id='

async function services() {
  const fri = await fetch(api_url + '327370808');
  const dat = await fri.json();
  const latitude = dat.results[0].version;

  document.getElementById('services').textContent = latitude;
}

async function check() {
  const fri = await fetch(api_url + '864291358');
  const dat = await fri.json();
  const latitude = dat.results[0].version;

  document.getElementById('check').textContent = latitude;
}

async function cca() {
  const fri = await fetch(api_url + '1357742931');
  const dat = await fri.json();
  const latitude = dat.results[0].version;

  document.getElementById('cc').textContent = latitude;
}

async function head() {
  const fri = await fetch(api_url + '1215339253');
  const dat = await fri.json();
  const latitude = dat.results[0].version;

  document.getElementById('head').textContent = latitude;
}

async function music() {
  const fri = await fetch(api_url + '368561278');
  const dat = await fri.json();
  const latitude = dat.results[0].version;

  document.getElementById('ms').textContent = latitude;
}

async function people() {
  const fri = await fetch(api_url + '1029697457');
  const dat = await fri.json();
  const latitude = dat.results[0].version;

  document.getElementById('people').textContent = latitude;
}

async function calendar() {
  const fri = await fetch(api_url + '784966220');
  const dat = await fri.json();
  const latitude = dat.results[0].version;

  document.getElementById('cal').textContent = latitude;
}

services();
check();
cca();
head();
music();
people();
calendar();


// NOW TO GET THE ANDROID VERSIONS

const android_url = "https://api.appmonsta.com/v1/stores/android/details/";
const android_end_url = ".json?country=US";

async function services_a() {
 const response = await fetch(android_url + 'com.ministrycentered.PlanningCenter' + android_end_url, {method: 'GET', headers: new Headers({'Authorization': 'Basic ' + btoa('5bfe013167c034b97875e2c4d1b5d5ff6d4946a5:x'),'Content-Type': 'application/json'}),});
 const dat = await response.json();
 const ver = dat.version;
 if (ver == 'Varies with device') {document.getElementById('services2').textContent = 'Varies';} else {document.getElementById('services2').textContent = ver;} 
}

async function check_a() {
 const response = await fetch(android_url + 'com.ministrycentered.checkins' + android_end_url, {method: 'GET', headers: new Headers({'Authorization': 'Basic ' + btoa('5bfe013167c034b97875e2c4d1b5d5ff6d4946a5:x'),'Content-Type': 'application/json'}),});
 const dat = await response.json();
 const ver = dat.version;
 if (ver == 'Varies with device') {document.getElementById('check2').textContent = 'Varies';} else {document.getElementById('check2').textContent = ver;} 
}

async function cca_a() {
 const response = await fetch(android_url + 'com.ministrycentered.churchcenter' + android_end_url, {method: 'GET', headers: new Headers({'Authorization': 'Basic ' + btoa('5bfe013167c034b97875e2c4d1b5d5ff6d4946a5:x'),'Content-Type': 'application/json'}),});
 const dat = await response.json();
 const ver = dat.version;
 if (ver == 'Varies with device') {document.getElementById('cc2').textContent = 'Varies';} else {document.getElementById('cc2').textContent = ver;} 
}

async function head_a() {
 const response = await fetch(android_url + 'com.ministrycentered.headcounts' + android_end_url, {method: 'GET', headers: new Headers({'Authorization': 'Basic ' + btoa('5bfe013167c034b97875e2c4d1b5d5ff6d4946a5:x'),'Content-Type': 'application/json'}),});
 const dat = await response.json();
 const ver = dat.version;
 if (ver == 'Varies with device') {document.getElementById('head2').textContent = 'Varies';} else {document.getElementById('head2').textContent = ver;} 
}

async function music_a() {
 const response = await fetch(android_url + 'com.ministrycentered.musicstand' + android_end_url, {method: 'GET', headers: new Headers({'Authorization': 'Basic ' + btoa('5bfe013167c034b97875e2c4d1b5d5ff6d4946a5:x'),'Content-Type': 'application/json'}),});
 const dat = await response.json();
 const ver = dat.version;
 if (ver == 'Varies with device') {document.getElementById('ms2').textContent = 'Varies';} else {document.getElementById('ms2').textContent = ver;} 
}

async function people_a() {
 const response = await fetch(android_url + 'com.ministrycentered.people' + android_end_url, {method: 'GET', headers: new Headers({'Authorization': 'Basic ' + btoa('5bfe013167c034b97875e2c4d1b5d5ff6d4946a5:x'),'Content-Type': 'application/json'}),});
 const dat = await response.json();
 const ver = dat.version;
 if (ver == 'Varies with device') {document.getElementById('people2').textContent = 'Varies';} else {document.getElementById('people2').textContent = ver;} 
}

async function calendar_a() {
 const response = await fetch(android_url + 'com.ministrycentered.resources' + android_end_url, {method: 'GET', headers: new Headers({'Authorization': 'Basic ' + btoa('5bfe013167c034b97875e2c4d1b5d5ff6d4946a5:x'),'Content-Type': 'application/json'}),});
 const dat = await response.json();
 const ver = dat.version;
 if (ver == 'Varies with device') {document.getElementById('cal2').textContent = 'Varies';} else {document.getElementById('cal2').textContent = ver;} 
}



services_a();
check_a();
cca_a();
head_a();
music_a();
people_a();
calendar_a();



