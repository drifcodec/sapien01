$(document).ready(function() {

    $('#create_ro').click(function() {
        /* 
                console.log("1")
                axios.post('/api/site/map_site_create', {
                        "site_id": $("#site_id").val(),
                    })
                    .then(response => {
                        var types = ["siteName", "site_id", "region", "siteType", "siteAddress", "siteLat",
                            "siteLong", "SiteCat", "siteSubCat", "operator", "Priority"
                        ]
                        types.forEach(type => {
                            $("#" + type).val('')
                        });
                        console.log("RES", response.data)
                    })
                    .catch(error => console.error(error)); */

    })
    $('#site_id').click(function() {
        console.log("2")
        var types = ["site_name", "site_address", "latitude", "longitude", "region", "site_type"]
        types.forEach(type => {
            $("#" + type).val('')
        });
    })

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
                $('#site_id').append(`<option value="${site_id}" data-id='${_id}'>${site_id} </option>`)
            }
        })
        .catch(error => console.error(error));
    $("#id").hide()
    $("#user_id").attr('readonly', 'readonly');
    console.log(localStorage)

    $('#site_id').change(function() {
        console.log("3")
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
                $("#site_type").val(res.site_type)
                $("#site_name").val(res.name)
                $("#region").val(res.region)
                $("#site_address").val(res.site_address)
                $("#latitude").val(res.latitude)
                $("#longitude").val(res.longitude)
            })
            .catch(error => console.error(error));
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

    $("#delete_site").click(function() {
        var id = $(this).val();
        axios.delete(`/api/site/map_site_delete/${id}`)
            .then(response => {
                $("#delete_confirm").modal('hide');
                $("#table_id").DataTable().ajax.reload(null, false)
            })
            .catch(error => {
                alert(error)
                $("#delete_confirm").modal('hide');
                console.log("Error Occured . Contact Admin" + error)
            });
    });
})