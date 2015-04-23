$(document).ready(function(){
  if(localStorage.is_login){
    $("#login").hide();
  }
  $('form#login').click(function(){
    var data = {email: $("#email").val(), password: $("#password").val()};
    console.log(data);
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
