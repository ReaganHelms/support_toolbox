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

var client = null

$(function() {
  client = ZAFClient.init();
  
  client.invoke('resize', {
    width: '100%',
    height: '325px'
  })

  client.get('ticket').then((data) => {
    showInfo(data.ticket)
  }, showError)
});

function showInfo(ticket) {  
  // Find and display user data
  var requester_data = {
    'name': ticket.requester.name,
    'email': ticket.requester.email,
    'notes': ticket.requester.notes,    
  };

  var source = $("#requester-template").html();  
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#requester-content").html(html);

  var notesSource = $("#notes-template").html();
  var notesTemplate = Handlebars.compile(notesSource);
  var notesHtml = notesTemplate(requester_data);
  $("#notes-content").html(notesHtml);

  findNewAndOpenTickets(requester_data.email);

  // Find and display ticket data

  var noWarning = true
  if(ticket.tags.join().match(/unicorn|vip|power_user|requested_feature|beta|pcu|myplanningcenter|to_be_triaged|customer_attachment/g) || notes != null) { 
    noWarning = false
  }

  var noTrial = true
  if(ticket.tags.join().match(/check_ins_trial|giving_trial|groups_trial|registrations_trial|calendar_trial|resources_trial|services_trial/g)) { 
    noTrial = false
  }

  var ticket_data = {
    'id': ticket.id,
    'tags': ticket.tags,
    'created_at': formatDate(ticket.created_at),
    'unicorn': ticket.tags.includes('unicorn'),
    'vip': ticket.tags.includes('vip'),
    'power_user': ticket.tags.includes('power_user'),
    'requested_feature': ticket.tags.includes('requested_feature'),
    'beta': ticket.tags.includes('beta'),
    'pcu': ticket.tags.includes('pcu'),
    'myplanningcenter': ticket.tags.includes('myplanningcenter'),
    'triage': ticket.tags.includes('to_be_triaged'),
    'attachment': ticket.tags.includes('customer_attachment'),
    'noWarning': noWarning,
    'CalendarTrial': ticket.tags.includes('resources_trial') || ticket.tags.includes('calendar_trial'),
    'Check-InsTrial': ticket.tags.includes('check_ins_trial'),
    'GivingTrial': ticket.tags.includes('giving_trial'),
    'GroupsTrial': ticket.tags.includes('groups_trial'),
    'RegistrationsTrial': ticket.tags.includes('registrations_trial'),
    'ServicesTrial': ticket.tags.includes('services_trial'),
    'noTrial': noTrial,
    'canada': ticket.tags.includes('canada'),
  };

  var source = $("#ticket-template").html();
  var template = Handlebars.compile(source);
  var html = template(ticket_data);
  $("#ticket-content").html(html);
}

function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#ticket-content").html(html);
}

function formatDate(date) {
  var cdate = new Date(date);
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  date = cdate.toLocaleDateString("en-us", options);
  return date;
}

function findNewAndOpenTickets(email) {
  var d = new Date();
  var twoDaysAgo = new Date(d.setDate(d.getDate() - 2));
  var searchDate =  `${twoDaysAgo.getFullYear()}-${("0" + (twoDaysAgo.getMonth() + 1)).slice(-2)}-${("0" + twoDaysAgo.getDate()).slice(-2)}`;
  var settings = {
    url: `/api/v2/search.json?query=created>${searchDate} requester:${email} type:ticket`,
    type:'GET',
    dataType: 'json',
  }

  client.request(settings).then(function(data) {
    updateTicketInfo(data)
  }, showError);
}

function updateTicketInfo(tickets) {
  if(tickets.count > 1){
    var openTicketsSource = $("#open-tickets").html();
    var openTicketsTemplate = Handlebars.compile(openTicketsSource);
    var openTicketsHtml = openTicketsTemplate({'numberOfOpenTickets': tickets.count});
    $("#open-ticket-content").html(openTicketsHtml);
  }
}
