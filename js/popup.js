$(document).ready(function(){
  $("#sign_up_form").hide();
  if(localStorage.is_login){
    $("#login").hide();
  }

  $("#sign_in").click(function(){
    $("#login").show();
    $("#sign_up_form").hide();
  });

  $("#sign_up").click(function(){
    $("#login").hide();
    $("#sign_up_form").show();
  });

  $('form#sign_up_form').click(function(){
    var data = {email: $("#sign_up_email").val(), password: $("#sign_up_password").val(), username: $("#username").val()};
    $.ajax({
       type: "POST",
       url: 'http://localhost:3000/api/v1/auth/sign_up',
       data: data,
       success: function(user){
         $("#sign_up_form").hide();
         $("#login").show();
       }
     });
    return false;
  });

  $('form#login').click(function(){
    var data = {email: $("#email").val(), password: $("#password").val(), change_token: false};
    $.ajax({
       type: "POST",
       url: 'http://localhost:3000/api/v1/auth/sign_in',
       data: data,
       success: function(user){
         if(typeof(Storage) !== "undefined"){
           localStorage.user_id = user._id;
           localStorage.user_email = user.email;
           localStorage.token = user.auth_token;
           localStorage.is_login = true;
         }
         $("#login").hide();
       }
     });
    return false;
  });
});
