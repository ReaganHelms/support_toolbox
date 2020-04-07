

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
     


