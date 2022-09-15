
var scripts = [
    "https://www.google.com/jsapi",
    "https://www.gstatic.com/charts/loader.js",
    "https://code.jquery.com/jquery-1.4.2.min.js",
    "https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js",
    "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js",
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js", "https://cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js",
    "https://cdn.datatables.net/1.10.10/js/dataTables.bootstrap.min.js", "https://cdn.datatables.net/buttons/1.0.3/js/buttons.html5.min.js",
    "https://cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js", "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    "https://cdn.datatables.net/buttons/1.6.5/js/dataTables.buttons.min.js", "https://cdn.datatables.net/buttons/1.6.5/js/buttons.flash.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js", "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js", "https://cdn.datatables.net/buttons/1.6.5/js/buttons.html5.min.js",
    "https://cdn.datatables.net/buttons/1.6.5/js/buttons.print.min.js"]

window.addEventListener("DOMContentLoaded", () => loadScript(scripts, 0));

function loadScript(scripts, index) {
  if (!scripts[index]) return;

  const scriptTag = document.createElement("script");
  scriptTag.src = scripts[index];
  scriptTag.addEventListener("load", () => loadScript(scripts, index + 1));
  document.body.appendChild(scriptTag);
  $(document).ready(function () {
    var html_ = `
<div class="panel-body">
<table id="table_id" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" style="width:100%">
<thead>
    <tr>
<th>Parent Name</th>
<th>Description</th>
<th>Operation</th>
    </tr>
  </thead>
</table>
</div>`
    $("#table_query").append(html_)
    $.fn.dataTable.ext.errMode = 'none';
    $('#table_id').DataTable({
        dom: 'lBfrtip',
        buttons: [
            'copy', {
                extend: 'excel',
                text: 'Export Page',
                exportOptions: {
                    modifier: {
                        // DataTables core
                        order: 'index', // 'current', 'applied', 'index',  'original'
                        page: 'all', // 'all',     'current'
                        search: 'none' // 'none',    'applied', 'removed'
                    }
                }
            }
        ],
        /* buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ], */
        /* 
                "pageLength": 5, */

        "search": {
            "search": ""
        },
        rowReorder: true,
        //"select": true,
        "paging": true,
        "processing": true,
        "serverSide": true,
        "dataType": "json",
        /* 
              "scrollY": "70%", 
              "scrollCollapse": true,  */
        "ordering": true,
        "info": true,
        'ajax': {
            type: "POST",
            url: '/api/parent_menu/parent_menu_getList_table',
            error: function (xhr, error, code) {
                //  self.location = "C:/Users/User/Desktop/Restfull_api/server-side/html/login.html";
            }
        },
        "aoColumns": [{
            "data": "parent_menu"
        }, {
            "data": "description"
        }, {
            'data': null,
            "render": function (item, type, full, meta) {

                var operation = `<div style="display: inline-block;">   <i class="material-icons md-18" onclick="load_update('${item._id}')" >edit</i></div>
                         <div style="display: inline-block;"> <i class="material-icons md-18" onclick="delete_value('${item._id} ')" >delete</i></div>`
                return operation
            }
        }]
    });
    $("#delete_user").click(function () {
        var user_id = $(this).val();
        axios.delete(`/api/parent_menu/${user_id}`)
            .then(response => {
                $("#delete_confirm").modal('hide');
                $("#table_id").DataTable().ajax.reload(null, false)
            })
            .catch(error => {
                $("#delete_confirm").modal('hide');
                alert(error.response.data.message)
                console.log("Error Occured . Contact Admin", error.response.data.message)
            });
    });

    $("#create_update").click(function () {
        if ($(this).val() === 'create') {
            axios.post(`/api/parent_menu/parent_menu_create`, {
                //user_id: $('#user_id').val(),
                parent_menu: $('#parent_menu').val(),
                description: $('#description').val(),
            }).then(response => {

                $("#AddUser").modal('hide');
                $("#table_id").DataTable().ajax.reload(null, false)
            })
                .catch(error => {
                    $("#delete_confirm").modal('hide');
                    console.log("Error Occured . Contact Admin" + error)
                });
        }
        if ($(this).val() === 'update') {
            var id = $('#_id').val()
            axios.put(`/api/parent_menu/${id}`, {
                id: id,
                parent_menu: $('#parent_menu').val(),
                description: $('#description').val(),
            }).then(response => {
                $("#AddUser").modal('hide');
                $("#table_id").DataTable().ajax.reload(null, false)
            })
                .catch(error => {
                    $("#delete_confirm").modal('hide');
                    console.log("Error Occured . Contact Admin" + error)
                });
        }
    })
});

function load_update(id) {
    axios.get(`/api/parent_menu/${id}`)
        .then(response => {
            var data = response.data.result[0]
            console.log(data)
            $('#_id').val(data._id)
            $('#_id').hide()
            $("#parent_menu").attr("disabled", true);
            $('#parent_menu').val(data.parent_menu)
            $('#description').val(data.description)
            $("#create_update").val('update')
            $('#AddUser').modal();
        })
        .catch(error => {
            alert(error)
            $("#delete_confirm").modal('hide');
            console.log("Error Occured . Contact Admin" + error)
        });
}

function create_values() {
    $("#create_update").val('create')
    $("#parent_menu").prop("disabled", false)
    $('#parent_menu').val(''),
        $('#description').val(''),
        $('#AddUser').modal();
}

function delete_value(id) {
    $('#delete_confirm').modal()
    $("#delete_user").val(id)
}
}
