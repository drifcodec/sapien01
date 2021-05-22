$(document).ready(function () {

  $("#log_out").click(function () {
    getLocation()

  })
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      logout_log('', '')
    }
  }

  function showPosition(position) {
    logout_log(position.coords.latitude, position.coords.longitude)
  }
  function logout_log(lat, long) {
    var api_url = `http://localhost:3000/api/user_log/userLog_create`
    $.ajax({
      url: api_url,
      type: "POST",
      contentType: "application/json;charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        "user_id": localStorage.Sapion_U_iD,
        "log_type": "Log out",
        "log_lat": lat,
        "log_long": long
      }),
      success: function (result) {
        localStorage.clear()
        window.location.href = `http://localhost:3000/index.html`
      },
      error:function(err){
        alert(JSON.stringify(err))
      }
    });
  }
})