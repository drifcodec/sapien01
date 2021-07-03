$(document).ready(function () {
    $(".account_circle").click(function () {
        console.log(localStorage)
        addTab('Personal Configuration', `/pg/web/user_mngmt/profile.html`)

    })
    $(".notification-trigger").click(function () {
        console.log(localStorage)
        addTab('My Notifications', `/pg/web/notifications/my_notification.html`)

    })
    check_user()
    function check_user() {
        $.ajax({
            url: '/api/notification/notification_getList_pending',
            headers: { 'Authorization': 'Bearer ' + localStorage.SapionT },
            contentType: 'application/json',
            type: "GET",
            dataType: 'json',
            data: JSON.stringify({"user_id":"dannynho","password": "dannynho" })
        ,
            success: function (result) {
                console.log("COUNT ", result)
                $('#notification_count').html(result.length)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown)
            }

        });
    }
})