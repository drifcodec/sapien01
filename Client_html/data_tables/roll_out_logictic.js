$(document).ready(function () {
    var html_ = `
        <div class="panel-body">
        <table id="example" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" style="width:100%">
        <thead>
            <tr>
            <th>device_id</th>
            <th>operator</th>
            <th>title</th>
            <th>current_status</th>
            <th>Time</th>
            <th>priority</th>

            <th>distance</th>
            <th>duration</th>
            <th>duration minutes</th>
            <th>origin addresses</th>
            <th>arrived duration</th>
            <th>arrived time</th>
            <th>late duration</th>
            
            </tr>
          </thead>
      </table>
       </div>`
    $("#table_query").append(html_)
    setInterval(function () {
        $("#example").DataTable().ajax.reload(null, false)
    }, 20000)
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#example').DataTable({
        
        /* dom: 'Bfrtip', 
        buttons: [
            'copy', 'csv', 'excel'
        ], */
        /* buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ], *//* 
        "pageLength": 5, */ 
      
        "search": {
            "search": "nestor"
          }, 
        "paging": true,/* 
        "pageLength": 5,  */
        "processing": true,
        "serverSide": true, 
        "dataType" : "json",  
        "scrollY": "70%", 
        "scrollCollapse": true, 
        "paging":   true,
        "ordering": false, 
        "info":     false,  
        'ajax': { 
            type: "POST",
            url: 'http://localhost:3000/api/roll_out/roll_out_getList',
           

            error: function (xhr, error, code) {
              //  self.location = "C:/Users/User/Desktop/Restfull_api/server-side/html/login.html";
            }
        },
        "aoColumns": [
            { "data": "device_id" , "defaultContent": "", 'name':'device Id'},
            { "data": "operator"  , "defaultContent": "", 'name':'operator'},
            { "data": "title"  , "defaultContent": "", 'name':'title'},
            {
            "targets": [6],
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (rowData.current_status === 'completed') {
                        $(td).css('background', 'green').css('color', 'white');
                    } if (rowData.current_status === 'created') {
                        $(td).css('background', 'grey').css('color', 'white');
                    }
                    $(td).append(rowData.current_status)//
                }
            },
            {
                "data": null, "render": function (item, type, full, meta) {
                    var accept_time = (new Date(`${item.accept_time === undefined ? "" : item.accept_time}`)).toLocaleString();
                    var depart_time = (new Date(`${item.depart_time === undefined ? "" : item.depart_time}`)).toLocaleString();
                    var arrived_time = (new Date(`${item.arrived_time === undefined ? "" : item.arrived_time}`)).toLocaleString();
                    var completed_time = (new Date(`${item.completed_time === undefined ? "" : item.completed_time}`)).toLocaleString();
                    var time_object = `Accept: ${accept_time === 'Invalid Date' ? '' : accept_time}</br>Depart: ${depart_time=== 'Invalid Date' ? '':depart_time }</br>Arrive: ${arrived_time=== 'Invalid Date' ? '':arrived_time}</br>Complete: ${completed_time=== 'Invalid Date' ? '':completed_time}`
                    return time_object
                }
            },
            {
                "targets": [6],
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (rowData.priority === 'Major') {
                        $(td).css('background', 'red').css('color', 'white');
                    } if (rowData.priority === 'Medium') {
                        $(td).css('background', 'orange').css('color', 'white');
                    } if (rowData.priority === 'Low') {
                        $(td).css('background', 'green').css('color', 'white');
                    }
                    $(td).text(rowData.priority)//
                }
            },
            {"data":  "distance_estimate", "defaultContent": "", 'name':'Distance estimate'},
            {"data": "duration_estimate", "defaultContent": "", 'name':'duration estimate'},
            {"data": "duration_estimate_in_minutes", "defaultContent": "", 'name':'duration_estimate_in_minutes'},
            {"data": "origin_addresses", "defaultContent": "", 'name':'origin_addresses'},
            {"data":  "arrived_duration", "defaultContent": "", 'name':'rrived_duration'},
            {"data":  "arrived_time", "defaultContent": "", 'name':'arrived_time'},
            {"data": "late_duration", "defaultContent": "", 'name':'late_duration'},
            
            /*  { "aTargets": [5], "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
                 console.log(oData.priority)
                 if(oData.priority=="Major"){
                 $(nTd).css('background-color', '#DFF2BF').css('color', 'white').css('font-weight', 'bold');
                     
                 }
             }
         } */
            /*  {"rowCallback": null, "render": function( row, cells,data, index ) {
                 console.log(cells)
                   // $('td', cells).css('background-color', 'Red');   
                    $(row).find('td:eq(3)').css('background-color', 'red')
                 }
             } */
        ],
        
    });

}) 
