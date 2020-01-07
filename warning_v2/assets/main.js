$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '250px' });
  
  client.get('ticket.requester.id').then(
    function(data) {
      var user_id = data['ticket.requester.id'];
      requestUserInfo(client, user_id);
    }
  );
});

function requestUserInfo(client, id) {
  var settings = {
    url: '/api/v2/users/' + id + '.json',
    type:'GET',
    dataType: 'json',
  };

  client.request(settings).then(function(data) { showInfo(client, data) }, showError);
}

function requestTicketInfo(client, id, notes) {
  var settings = {
    url: '/api/v2/tickets/' + id + '.json',
    type:'GET',
    dataType: 'json',
  };

  client.request(settings).then(function(data) { showTicketInfo(data, notes) }, showError);
}

function showInfo(client, data) {

  var requester_data = {
    'name': data.user.name,
    'tags': data.user.tags,
    'email': data.user.email,
    'created_at': formatDate(data.user.created_at),
    'last_login_at': formatDate(data.user.last_login_at),
    'notes': data.user.notes,
  };

  var source = $("#requester-template").html();  
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#requester-content").html(html);

  var notesSource = $("#notes-template").html();
  var notesTemplate = Handlebars.compile(notesSource);
  var notesHtml = notesTemplate(requester_data);
  $("#notes-content").html(notesHtml);

  client.get('ticket.id').then(
    function(data) {
      var ticket_id = data['ticket.id'];
      requestTicketInfo(client, ticket_id, requester_data.notes);
    }
  );
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

function showTicketInfo(data, notes) {
  var noWarning = true;

  if(data.ticket.tags.join().match(/unicorn|vip|power_user|requested_feature|beta|pcu|myplanningcenter|to_be_triaged|customer_attachment/g) || notes != null) { 
    noWarning = false;
  }

   var noTrial = true;

  if(data.ticket.tags.join().match(/check_ins_trial|giving_trial|groups_trial|registrations_trial|resources_trial|services_trial/g)) { 
    noTrial = false;
  }

  var ticket_data = {
    'id': data.ticket.id,
    'tags': data.ticket.tags,
    'created_at': formatDate(data.ticket.created_at),
    'unicorn': data.ticket.tags.includes('unicorn'),
    'vip': data.ticket.tags.includes('vip'),
    'power_user': data.ticket.tags.includes('power_user'),
    'requested_feature': data.ticket.tags.includes('requested_feature'),
    'beta': data.ticket.tags.includes('beta'),
    'pcu': data.ticket.tags.includes('pcu'),
    'myplanningcenter': data.ticket.tags.includes('myplanningcenter'),
    'triage': data.ticket.tags.includes('to_be_triaged'),
    'attachment': data.ticket.tags.includes('customer_attachment'),
    'noWarning': noWarning,
    'Check-InsTrial': data.ticket.tags.includes('check_ins_trial'),
    'GivingTrial': data.ticket.tags.includes('giving_trial'),
    'GroupsTrial': data.ticket.tags.includes('groups_trial'),
    'RegistrationsTrial': data.ticket.tags.includes('registrations_trial'),
    'ResourcesTrial': data.ticket.tags.includes('resources_trial'),
    'ServicesTrial': data.ticket.tags.includes('services_trial'),
    'noTrial': noTrial,
    'canada': data.ticket.tags.includes('canada'),
  };
  console.log ("here are the tags");
  console.log (data.ticket.tags);

  var source = $("#ticket-template").html();
  var template = Handlebars.compile(source);
  var html = template(ticket_data);
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
