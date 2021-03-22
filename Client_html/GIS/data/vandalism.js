
var vandalism_list = [];
var vandalism_list_storage = [];
var counter = 0.60 * 60 * 1000
function vandalism_load() {
  axios.get('http://localhost:3000/api/vandalism', {
  })
    .then(response => {
     vandalism_func(response.data.results)
    })
    .catch(error => console.error(error));
};
vandalism_load()

function vandalism_func(marker) {
  var high_priority = 0
  var medioum_priority = 0
  var low_priority = 0
  
  for (i = 0; i < marker.length; i++) {
    var data = marker[i]
    var vandalism_data = {};
    vandalism_data.coords = { lat: data.latitude * 1, lng: data.longitude * 1 }
    if (data.priority == 'high') {
      vandalism_data.iconImage = vandalism_icons.high
    } else if (data.medioum_priority == 'medium') {
      vandalism_data.iconImage = vandalism_icons.medium
    } else if (data.priority == 'low') {
      vandalism_data.iconImage = vandalism_icons.low
    } else {
      vandalism_data.iconImage = vandalism_icons.low
    }
    vandalism_data.reporter = data.report_by
    vandalism_data.type = "vandalism"
    vandalism_data.status = data.priority
    vandalism_data.created_date = data.created_date
    vandalism_data.content = vandalism_func_contents.v_content(data.priority, data.report_by,data.description)
    vandalism_data.tooltip = vandalism_func_contents.tooltip(data.priority, data.report_by,data.description)

    vandalism_list.push(vandalism_data)
    vandalism_list_storage.push(vandalism_data)
  
    if (data.priority == 'high') {
      high_priority += 1
     // $('.filter_red').text(offline)
    } else if
      (data.priority == 'medium') {
        medioum_priority += 1
     // $('.filter_green').text(online)
    } else if (data.priority == 'low') {
        low_priority += 1
     // $("#busy_count").text(busy)
    }
  }
 // $('.all_vandalism').text(high_priority + medium_priority+low_priority)

$('#from_count_arrived').click(function () {
  var specificValuesFromArray = vandalism_list_storage.filter(obj => obj.priority === 'high');
  console.log("available count ", specificValuesFromArray)
})
$('#from_count_busy').click(function () {
  var specificValuesFromArray = vandalism_list_storage.filter(obj => obj.priority === 'medium');
  console.log("busy count", specificValuesFromArray)
})

}

var vandalism_func_contents = {
   v_content: function (priority, reporter,desc) {
    var device_tooltip_content = ` 
  <div class="hoverTips">
 <div class="tipsTable">
   <table>
     <tbody>
       <tr>
         <td class="tipsTitle"> Device ID: </td>
         <td title="${priority}">${priority}</td>
       </tr>
       <tr>
         <td class="tipsTitle"> Status: </td>
         <td title="${reporter}"> ${reporter} </td>
       </tr>
       <tr>
         <td class="tipsTitle"> DESC </td>
         <td title="5"> ${desc} </td>
       </tr>
     </tbody>
   </table>
   
 </div>
</div>`
    return device_tooltip_content 
 },
  tooltip: function (priority, reporter,desc) {
 var device_tooltip_content = ` 
  <div class="hoverTips">
 <div class="tipsTable">
   <table>
     <tbody>
       <tr>
         <td class="tipsTitle"> Device ID: </td>
         <td title="${priority}">${priority}</td>
       </tr>
       <tr>
         <td class="tipsTitle"> Status: </td>
         <td title="${reporter}"> ${reporter} </td>
       </tr>
       <tr>
         <td class="tipsTitle"> DESC: </td>
         <td title="5">${desc} </td>
       </tr>
     </tbody>
   </table>
 </div>
</div>`
    return device_tooltip_content }
  }
setInterval(function () {
vandalism_load()
console.log("vandalism call made")
}, counter
)
