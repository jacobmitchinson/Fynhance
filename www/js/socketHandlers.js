var userTitle = "PairTrade";
var counter = 0;

$(document).ready(function(){
  var socket = io();
  var names = ["David", "Tom"]
  socket.emit("join", names.pop());

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

  socket.on("update", function(user){
    socket.emit("user-list", name);
    if(ready === true) {
      $("#users").html("<li>" + name + "</li>");
    }
  });

  socket.on("update", function(msg) {
    if(ready) {
      $("#msgs").append("<li>" + msg + "</li>");
    }
  });

  socket.on("update-disconnect", function(user) {
    socket.emit("user-list", name);
    if(ready === true) {
      $("#users").html("<li>" + name + "</li>");
    }
  });

  socket.on("update-disconnect", function(user) {
    if(ready === true) {
      $("#msgs").append("<li>" + user + "</li>");
    }
  })

  socket.on("chat", function(who, company, market, shareAmount, price){
    if(ready) {
      if (company != null) {
        $("#msgs").append("<li>" +


          "<section class='col-md-6 newsfeed-box'>" +
            "<h3 class='share-title'>" + company + "</h3>" +
            "<h6 class='share-market'>" + market +  "</h3>" +
            "<h6 class='share-amount'>" + shareAmount + "@" + price + "</h6>" +
            "<img class='share-person' src='img/james-may.png'>" +
            "<section class='col-md-12 bottom-share-menu'>" +
              "<section class='col-md-4'>" +
                "<img class='share-icons' src='img/comment-01.png'>" +
              "</section>" +
              "<section class='col-md-4'>" +
                "<img class='share-icons' src='img/accept-01.png'>" +
              "</section>" +
              "<section class='col-md-4'>" +
                "<img class='share-icons' src='img/deny-01.png'>" +
              "</section>" +
            "</section>" +
          "</section>" +

          "</li>");
        $('#message' + counter).fadeIn();
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
