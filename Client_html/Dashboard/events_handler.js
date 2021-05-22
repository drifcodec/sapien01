$(document).ready(function () {
    $("#log_out").click(function () {
            var api_url = `http://localhost:3000/api/user_log/userLog_create`
            $.ajax({
              url: api_url,
              type: "POST",
              contentType: "application/json;charset=utf-8",
              dataType: 'json',
              data:JSON.stringify({
                "user_id":localStorage.Sapion_U_iD,
                "log_type":"Log out",
              }),
              success: function (result) {
                localStorage.setItem("SapionT", "null")
                window.location.href = `http://localhost:3000/index.html`
              },
            });
    
    })
})