$(document).ready(function () {
  $('body').hide()
  window.onload = check_user()
  function check_user() {
    var api_url = '/api/page_auth/get_user_auth'
    $.ajax({
      url: api_url,
      headers: { 'Authorization': 'Bearer ' + localStorage.SapionT },
      dataType: 'json',
      contentType: 'application/json',
      type: "GET",
      success: function (result) {
        $('body').show()
        console.log("LOGGIN STATUS", result.message)
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        var currentURL = window.location.href;
        window.location.href = `/index.html?${currentURL}`
      }

    });


  }
})