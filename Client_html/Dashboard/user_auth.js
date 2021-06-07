$(document).ready(function () {
  $('body').hide()
  window.onload = check_user()
  function check_user() {
    var api_url = 'http://localhost:3000/api/page_auth/get_user_auth'
    console.log(localStorage.SapionT)
    $.ajax({
      url: api_url,
      headers: { 'Authorization': 'Bearer ' + localStorage.SapionT },
      dataType: 'json',
      contentType: 'application/json',
      type: "GET",
      //data:stringify_data, 
      success: function (result) {
        $('body').show()
        console.log("LOGGIN STATUS", result.message)
        // alert(JSON.stringify(currentURL))
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        //alert(errorThrown)

        var currentURL = window.location.href;
       // window.location.href = `http://localhost:3000/index.html?${currentURL}`
      }

    });


  }
})