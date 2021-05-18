$(document).ready(function () {
    $(".account_circle").click(function(){
        addTab('Personal Configuration',`http://localhost:3000/Dashboard/profile.html?${localStorage.Sapion_id}`)
        var api_url = `http://localhost:3000/api/user/user_get/${localStorage.Sapion_id}`
        $.ajax({
            url: api_url,
            dataType: 'json',
            contentType: 'application/json',
            type: "GET",
            //data:stringify_data, 
            success: function (result) {
                alert(JSON.stringify(result))
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    })
   
})