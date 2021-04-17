
var device_list = [];
var device_list_storage = [];
var counter_site = 0.11* 60 * 1000 // 0 .60* 60 * 1000
function side_bar() {
  var append_html = `
   <div id='side_bar'>
      <button id='site_tracking' class=''>Site Tracking</button><br>
      <button id='wo_tracking'>wo tracking</button><br>
      <button id='se_tracking'> Engineer Tracking</button>
   </div>`
  $('body').append(append_html)
  $("#site_status").draggable()
}
function load_site() {
  axios.post('http://localhost:3000/api/device/getList', /* {
    "town": "",
    "device_id": "",
    "device_name": "",
    "device_address": "",
    "region": "",
    "device_status": "",
    "sort": "region",
    "record_date": "",
    "limit": 1000
  } */)
    .then(response => {
      console.log(response.data)
      pop_site(response.data.data)
    })
    .catch(error => console.error(error));
};

function pop_site(marker) {
  var online = 0
  var offline = 0
  var busy = 0
  var dead = 0
  device_list_storage.length = 0
  for (i = 0; i < marker.length; i++) {
    var data = marker[i]
    device_data = {};
    device_lat = data.lattiude * 1
    device_lng = data.longitude * 1
    status_img = data.imageUrl,
      device_data.coords = { lat: device_lat, lng: device_lng }
    if (data.device_status == '0') {
      device_data.iconImage = site_icons.power_off_icon
    } else if (data.device_status == '1') {
      device_data.iconImage = site_icons.power_on_icon
    } else if (data.device_status == '2') {
      device_data.iconImage = site_icons.maintenance_icon
    } else {
      device_data.iconImage = site_icons.pending_instalation_icon
    }
    device_data.id = data.device_id
    device_data.type = "site"
    device_data.status = data.device_status
    device_data.device_id = data.device_id
    device_data.content = device_contents.content(data.device_id, data.device_status)
    device_data.tooltip = device_contents.tooltip(data.device_id, data.device_status)

    if (typeof device_lat == 'number' && typeof device_lng == 'number') {
      device_list.push(device_data)
      device_list_storage.push(device_data)
    }
    if (data.device_status == 0) {
      offline += 1
      $('.filter_red').text(offline)
    } else if
      (data.device_status == 1) {
      online += 1
      $('.filter_green').text(online)
      $('#normal_site').text(online)
    } else if (data.device_status == 2) {
      busy += 1
      $("#busy_count").text(busy)
    }
    else if (data.device_status == 3) {
      dead += 1
      $("#dead_count").text(dead)
    }
  }
  $('.filter_all_wo').text(offline + online)
  var status_table = `
  <table id="status_table">
    <tr>
      <th>device Status</th>
      <th>idol</th>
      <th>count</th>
    </tr>
    <tr>
    <td>Online</td>
    <td><img src="${site_status_icons.online}"></td>
    <td id='online_count'>${online}</td>
    </tr>
    <tr>
    <td>offline</td>
    <td><img src="${site_status_icons.offline}"></td>
    <td id='offline_count'>${offline}</td>
    </tr>
    <tr>
    <td>Busy</td>
    <td><img src="${site_status_icons.maintenance}"></td>
    <td id='busy_count'>${busy}</td>
    </tr>
    <tr>
    <td>Dead</td>
    <td><img src="${site_status_icons.dead}"></td>
    <td id='dead_count'>${dead}</td>
    </tr>
  </table>`

  $('#site_status').html(status_table)
  $(".close").click(function () {
    $('#site_status').hide()
  })
}

$('#site_tracking').click(function () {
  //console.log("clicked")
  $('#site_status').toggle();
})
$('#from_count_arrived').click(function () {
  var specificValuesFromArray = device_list_storage.filter(obj => obj.status === '1');
  console.log("available count ", specificValuesFromArray)
})
$('#from_count_busy').click(function () {
  var specificValuesFromArray = device_list_storage.filter(obj => obj.status === '0');
  console.log("busy count", specificValuesFromArray)
})

var device_contents = {
  content: function (device_id, status) {
    var device_tooltip_content = ` 
  <div class="hoverTips">
 <div class="tipsTable">
   <table>
     <tbody>
       <tr>
         <td class="tipsTitle"> C Device ID: </td>
         <td title="${device_id}">${device_id}</td>
       </tr>
       <tr>
         <td class="tipsTitle"> Status: </td>
         <td title="${status}"> ${status} </td>
       </tr>
       <tr>
         <td class="tipsTitle"> WO Times: </td>
         <td title="5"> 5 </td>
       </tr>
     </tbody>
   </table>
   
   <button onclick="create_wo('${device_id}')">Create WO</button>
 </div>
</div>`
    return device_tooltip_content
  },
  tooltip: function (device_id, status) {
    var device_tooltip_content = ` 
  <div class="hoverTips">
 <div class="tipsTable">
   <table>
     <tbody>
       <tr>
         <td class="tipsTitle"> Device ID: </td>
         <td title="${device_id}">${device_id}</td>
       </tr>
       <tr>
         <td class="tipsTitle"> Status: </td>
         <td title="${status}"> ${status} </td>
       </tr>
       <tr>
         <td class="tipsTitle"> WO Times: </td>
         <td title="5"> 5 </td>
       </tr>
     </tbody>
   </table>
 </div>
</div>`
    return device_tooltip_content
  }
}

setInterval(function () {
  load_site()
  console.log("site call made")
}, counter_site
)

side_bar()
load_site()