$(document).ready(function () {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${localStorage.SapionT}`
    }
  };
  $("#refresh").click(function () {
    $("#example").DataTable().ajax.reload(null, false);
  });
  axios
    .get("/api/user_roles/user_roles_getList", {})
    .then((response) => {
      for (i = 0; i < response.data.length; i++) {
        var role_name = response.data[i].role_name;
        $("#roles").append(
          `<option value="${role_name}">${role_name}</option>`
        );
      }
    })
    .catch((error) => console.error(error));
  var html_ = `
    <div class="panel-body">
    <table id="table_id" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" style="width:100%">
    <thead>
        <tr>
    <th>User ID</th>
    <th>Name</th>
    <th>Surname</th>
    <th>Phone</th>
    <th>Email</th>
    <th>role</th>
    <th>Permission</th>
    <th>User status</th>
    <th>Operation</th>
        </tr>
      </thead>
  </table>
   </div>`;
  $("#table_query").append(html_);
  $.fn.dataTable.ext.errMode = "none";
  $("#table_id").DataTable({
    dom: "lBfrtip",
    buttons: [
      "copy",
      {
        extend: "excel",
        text: "Export Page",
        exportOptions: {
          modifier: {
            // DataTables core
            order: "index", // 'current', 'applied', 'index',  'original'
            page: "all", // 'all',     'current'
            search: "none", // 'none',    'applied', 'removed'
          },
        },
      },
    ],
    /* buttons: [
              'copy', 'csv', 'excel', 'pdf', 'print'
          ], */
    /* 
                  "pageLength": 5, */

    search: {
      search: "",
    },
    rowReorder: true,
    //"select": true,
    paging: true,
    processing: true,
    serverSide: true,
    dataType: "json",
    /* 
                "scrollY": "70%", 
                "scrollCollapse": true,  */
    ordering: true,
    info: true,
    ajax: {
      type: "POST",
      url: "/api/user/user_getList_table",
      error: function (xhr, error, code) {
        //  self.location = "C:/Users/User/Desktop/Restfull_api/server-side/html/login.html";
      },
    },
    aoColumns: [
      {
        data: "user_id",
      },
      {
        data: "name",
      },
      {
        data: "surname",
      },
      {
        data: "phone",
      },
      {
        data: "email",
      },
      {
        data: "RolesArr",
      },
      {
        data: "permission",
      },
      {
        data: "user_status",
      },
      {
        data: null,
        render: function (item, type, full, meta) {
          var status = item.user_status;
          var icon =
            item.user_status === "Active"
              ? "lock_open"
              : item.user_status === "Pending"
                ? "block"
                : "lock";
          var title_status =
            item.user_status === "Active"
              ? "Freeze"
              : item.user_status === "Frozen"
                ? "Activate"
                : "";
          var status_change =
            item.user_status === "Active"
              ? "Frozen"
              : item.user_status === "Frozen"
                ? "Active"
                : "Pending";
          var operation = `<div style="display: inline-block;"> <i class="material-icons md-18" onclick="load_update('${item._id}')" title="edit" >edit</i></div>
                             <div style="display: inline-block;"> <i class="material-icons md-18" onclick="delete_value('${item._id} ')" title="delete">delete</i></div>
                             <div style="display: inline-block;"> <i class="material-icons md-18" onclick="reset_paassword('${item._id} ')" title="reset">change_circle</i></div>
                             <div style="display: inline-block;"> <i class="material-icons md-18" onclick="status_update('${item._id}','${status_change}')" title="${title_status}" >${icon}</i></div>`;
          return operation;
        },
      },
    ],
    columnDefs: [
      {
        targets: 5,
        createdCell: function (td, cellData, rowData, row, col) {
          console.log("td")
          console.log(td)
          console.log("cellData")
          console.log(cellData)
          var data = []
          cellData.forEach(e => {
            data.push(e.role_name)
          });
          $(td).text(data)

        },
      }, {
        targets: 7,
        createdCell: function (td, cellData, rowData, row, col) {
          if (cellData === "Frozen") {
            $(td).css("background", "red").css("color", "white");
          }
          if (cellData === "Active") {
            $(td).css("background", "green").css("color", "white");
          }
          if (cellData === "Pending") {
            $(td).css("background", "orange").css("color", "white");
          }
        },
      },
    ],
  });
  $("#delete_user").click(function () {
    console.log("--> ID ---ID", config);
    var user_id = $(this).val();
    axios
      .delete(`/api/user/user_delete/${user_id}`, config)
      .then((response) => {
        $("#delete_confirm").modal("hide");
        $("#table_id").DataTable().ajax.reload(null, false);
      })
      .catch((error) => {
        alert(error);
        $("#delete_confirm").modal("hide");
        console.log("Error Occured . Contact Admin" + error);
      });
  });

  $("#create_update").click(function () {
    if ($(this).val() === "create") {
      $("#password").show()
      axios
        .post("/api/user/signup", {
          user_id: $("#user_id").val(),
          name: $("#name").val(),
          surname: $("#surname").val(),
          phone: $("#phone").val(),
          password: $("#password").val(),
          email: $("#email").val(),
          roles: $("#roles").val(),
          user_status: $("#user_status").val(),
        })
        .then((response) => {
          $("#AddUser").modal("hide");
          $("#table_id").DataTable().ajax.reload(null, false);
        })
        .catch((error) => {
          $("#delete_confirm").modal("hide");
          console.log("Error Occured . Contact Admin" + error);
        });
    }
    //
    if ($(this).val() === "update") {
      $("#password").hide()
      axios
        .put(`/api/user/user_update/${$("#id").val()}`, {
          user_id: $("#user_id").val(),
          name: $("#name").val(),
          surname: $("#surname").val(),
          phone: $("#phone").val(),
          email: $("#email").val(),
          roles: $("#roles").val(),
        }, config)
        .then((response) => {
          $("#AddUser").modal("hide");
          $("#table_id").DataTable().ajax.reload(null, false);
        })
        .catch((error) => {
          $("#delete_confirm").modal("hide");
          console.log("Error Occured . Contact Admin" + error);
        });
    }
  });
});

function load_update(id) {
  console.log("the ID is " + id);
  axios
    .get(`/api/user/user_get/${id}`)
    .then((response) => {
      var data = response.data.result;
      console.log("load ID ", data);
      $("#user_id").attr("disabled", "disabled");
      $("#id").attr("disabled", "disabled");
      $("#id").hide();
      $("#user_id").val(data.user_id);
      $("#id").val(data.id);
      $("#name").val(data.name);
      $("#surname").val(data.surname);
      $("#phone").val(data.phone);
      $("#email").val(data.email);
      $("#roles").val(data.roles);
      $("#permission").val(data.permission);
      $("#create_update").val("update");
      $("#AddUser").modal();
    })
    .catch((error) => {
      alert(error);
      $("#delete_confirm").modal("hide");
      console.log("Error Occured . Contact Admin" + error);
    });
}

function status_update(id, status) {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.SapionT}`,
    },
  };
  console.log("--> ID -freese" + id);
  if (status !== "Pending") {
    axios
      .put(
        `/api/user/user_update/${id}`,
        {
          user_status: status,
        },
        config
      )
      .then((response) => {
        $("#AddUser").modal("hide");
        $("#table_id").DataTable().ajax.reload(null, false);
      })
      .catch((error) => {
        $("#delete_confirm").modal("hide");
        console.log("Error Occured . Contact Admin" + error);
      });
  } else {
    alert("waiting for user to Accept");
  }
}

function create_values() {
  $("#id").hide();
  //$('#user_id').hide()
  $("#create_update").val("create");
  $("#user_id").val("");
  $("#name").val("");
  $("#surname").val("");
  $("#password").val("");
  $("#phone").val("");
  $("#email").val("");
  $("#roles").val("");
  $("#permission").val("");
  $("#AddUser").modal();
}

function delete_value(id) {
  $("#delete_confirm").modal();
  $("#delete_user").val(id);
}
