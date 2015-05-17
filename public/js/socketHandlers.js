var userTitle = "PAIRTRADE";
var counter = 0;

$(document).ready(function(){
  var socket = io();
  var clientName = $('#client-name').html();
  socket.emit("join", clientName);
  var ready = true;

  $("#name").focus().fadeIn(1000);
  $("form").submit(function(event){
    event.preventDefault();
  });

  $("#send").click(function(){
    var company = $("#company").val();
    var market = $("#market").val();
    var shareAmount = $("#share-amount").val();
    var price = $("#price").val();
    socket.emit("message", company, market, shareAmount, price);
    $("#msg").val("");
  });

  $("body").on('click', '#send-comment', function(event){
    event.preventDefault();
    var comment = $("#new-comment").val();
    var ticketID = this.value;
    console.log(ticketID);
    socket.emit("comment", comment, ticketID);
    $("#msg").val("");
  });

  socket.on("update", function(user){
    socket.emit("user-list", name);
    if(ready === true) {
      $("#users").html("<li>" + name + "</li>");
    }
  });

  socket.on("update", function(msg) {
    if(ready) {
      // $("#msgs").append("<li>" + msg + "</li>");
    }
  });

  socket.on("update-disconnect", function(user) {
    socket.emit("user-list", name);
    if(ready === true) {
      // $("#users").html("<li>" + name + "</li>");
    }
  });

  socket.on("update-disconnect", function(user) {
    if(ready === true) {
      // $("#msgs").append("<li>" + user + "</li>");
    }
  })

  socket.on("comment", function(who, comment, ticketID) {
    if(ready) {
      if(comment != null) {
        $("#ticket" + ticketID).append("Comments: <li>" + comment + "</li>");
      }
    }
  });

  socket.on("chat", function(who, company, market, shareAmount, price){
    if(ready) {
      if (company != null) {
        $("#msgs").append(
        "<li id='ticket" + counter + "\'>" +
          "<section class='col-md-12' id='newsfeed-box'>" +
            "<h3 class='share-title'>" + company + "</h3>" +
            "<h6 class='share-market'>" + market +  "</h3>" +
            "<h6 class='share-amount'>" + shareAmount + "@" + price + "</h6>" +
            "<img class='share-person' src='images/james-may.png'>" +
            "<section class='col-md-12 bottom-share-menu'>" +
              "<section class='col-xs-4'>" +
                "<img class='share-icons' src='images/comment-01.png'>" +
              "</section>" +
              "<section class='col-xs-4'>" +
                "<img class='share-icons' src='images/accept-01.png'>" +
              "</section>" +
              "<section class='col-xs-4'>" +
                "<img class='share-icons' src='images/deny-01.png'>" +
              "</section>" +
            "</section>" +

          "<form id='3' class='form-inline'>" +
            "<input type='text' class='input' placeholder='Comment' id='new-comment'>" +
            "<input type='hidden' value='ticket" + counter + "\'" +  "id='comment-ticket'" + ">" +
            "<button type='button' name='send' id='send-comment' value='" + counter + "\'" + "class='btn btn-success'>Comment</button>" +
          "</form>" +

          "</li>");
        $('#ticket' + counter).fadeIn();
          "</section>" + "</li>" + "<br>";
        counter += 1;
      }
    }
  });

  socket.on("disconnect", function(){
    $("#msgs").append("<li><strong><span class='text-warning'>The server is not available</span></strong></li>");
    $("#msg").attr("disabled", "disabled");
    $("#send").attr("disabled", "disabled");
  });

  socket.on("logged-in-users", function(who){
    if(ready === true){
      var users = '';
      $.each(who, function(index, person) {
        users += '<li>' + person + '</li>'
      })
      $('#users').append(users);
    }
  });

});
