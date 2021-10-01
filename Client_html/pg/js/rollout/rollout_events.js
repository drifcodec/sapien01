$(document).ready(function() {

    //operator
    $("#select").change(function() {
        var value = $(this).val();
        $("#operator").attr("value", value)
    });

    $("#operator").click(function() {
        $("#SelectInput").css('display', 'block')
        var myDropDown = $("#select");
        var length = $('#select> option').length;
        myDropDown.attr('size', length);
    })

    $('#SelectInput').change(function() {
        var myDropDown = $("#select");
        var length = $('#select> option').length;
        $("#SelectInput").css('display', 'none')
        myDropDown.attr('size', 0);
    });
    /////////////////////////////////////////////
    $('#create_ro').click(function() {
        axios.post('/api/roll_out/roll_out_create', {
                "creator": localStorage.SapionT,
                "operate_source": 'CPMA WEB',
                "device_type": $("#siteType").val(),
                "device_id": $("#sites").val(),
                "device_name": $("#siteName").val(),
                "device_address": $("#siteAddress").val(),
                "device_lat": $("#siteLat").val(),
                "device_long": $("#siteLong").val(),
                "priority": $("#priority").val(),
                "category": $("#siteCat").val(),
                "sub_category": $("#siteSubCat").val(),
                "operator": $("#operator").val()
            })
            .then(response => {
                var types = ["siteName", "sites", "region", "siteType", "siteAddress", "siteLat",
                    "siteLong", "SiteCat", "siteSubCat", "operator", "priority"
                ]
                alert("Order was created")
                types.forEach(type => {
                    $("#" + type).val('')
                });
                console.log("RES", response.data)
            })
            .catch(error => console.error(error));

    })
    $('#sites').change(function() {
        var types = ["siteName", "siteType", "siteAddress", "siteLat",
            "siteLong", "SiteCat", "siteSubCat", "operator", "Priority"
        ]
        types.forEach(type => {
            $(type).val('')
        });
        var id = $('option:selected', this).attr('data-id')
        axios.get('/api/site/site_get/' + id, {})
            .then(response => {
                console.log("the site is ", response.data.result)
                var res = response.data.result
                $("#siteType").val(res.site_type)
                $("#siteName").val(res.name)
                $("#siteAddress").val(res.site_address)
                $("#siteLat").val(res.lattiude)
                $("#siteLong").val(res.longitude)
            })
            .catch(error => console.error(error));
    })

    $('#siteCat').change(function() {
        $("#siteSubCat").html("<option selected=\"selected\"></option>")
        axios.post('/api/roll_out/sub_category_getList', {
                "category": $(this).val()
            })
            .then(response => {
                for (i = 0; i < response.data.length; i++) {
                    $('#siteSubCat').append(`<option value="${response.data[i].sub_category}">${response.data[i].sub_category} </option>`)
                }
            })
            .catch(error => console.error(error));
    })

    $('#region').change(function() {
        var types = ["siteName", "siteType", "siteAddress", "siteLat",
            "siteLong", "SiteCat", "siteSubCat", "operator", "Priority"
        ]
        types.forEach(type => {
            console.log("here")
            $("#" + type).val('')
        });
        $("#sites").html("<option selected=\"selected\"></option>")
        console.log("Region is ", $(this).val())
        axios.get('/api/site/site_getList', {
                params: {
                    region: $(this).val(),
                }
            })
            .then(response => {
                for (i = 0; i < response.data.length; i++) {
                    var _id = response.data[i]._id
                    var site_id = response.data[i].site_id
                    var name = response.data[i].name
                    $('#sites').append(`<option value="${site_id}" data-id='${_id}'>${site_id} </option>`)
                }
            })
            .catch(error => console.error(error));
    })
    axios.get('/api/site/region_getList', {})
        .then(response => {
            for (i = 0; i < response.data.length; i++) {
                var name = response.data[i].name
                $('#region').append(`<option value="${name}">${name} </option>`)
            }
        })
        .catch(error => console.error(error));
    axios.post('/api/roll_out/category_getList', {})
        .then(response => {
            for (i = 0; i < response.data.length; i++) {
                var category = response.data[i].category
                $('#siteCat').append(`<option value="${category}">${category} </option>`)
            }
        })
        .catch(error => console.error(error));
    $("#id").hide()
    $("#user_id").attr('readonly', 'readonly');
    console.log(localStorage)
    var api_url = `/api/user/user_get/${localStorage.Sapion_id}`
    $.ajax({
        url: api_url,
        dataType: 'json',
        contentType: 'application/json',
        type: "GET",
        success: function(data) {
            //	alert(JSON.stringify(data.result))
            $("#id").val(data.result.id)
            $("#user_id").val(data.result.user_id)
            $("#name").val(data.result.name)
            $("#surname").val(data.result.surname)
            $("#phone").val(data.result.phone)
            $("#email").val(data.result.email)

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {}
    });

    $('#change_password').click(function() {
        console.log("_____")
        $('#change_password_module').modal();
    })
    $('#update').click(function() {
        var id = $('#id').val()
        console.log("--> ID -->", id)
        axios.put(`/api/user/user_update/${id}`, {
                name: $('#name').val(),
                surname: $('#surname').val(),
                phone: $('#phone').val(),
                email: $('#email').val(),
            }).then(response => {
                alert("Updated")
                console.log("yes--->")
            })
            .catch(error => {
                $("#delete_confirm").modal('hide');
                console.log("Error Occured . Contact Admin" + error)
            });
    })
    $('#save_new_password').click(function() {
        var stringify_data = {
            "old_password": $('#old_password').val(),
            "password": $('#new_password').val(),
            "confirm_password": $('#confirm_password').val()
        };
        console.log(localStorage.SapionT)
        var key = localStorage.SapionT
        $.ajax({
            url: `/api/user/change_password_email/${key}`,
            type: "POST",
            dataType: 'json',
            data: stringify_data,
            success: function(result) {
                alert(" updated")
                    // self.location = "http://localhost:3000"
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("not updated")
            }
        });

    })
})