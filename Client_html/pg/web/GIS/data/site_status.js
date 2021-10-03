var device_list = [];
var device_list_storage = [];
var counter_site = 0.12 * 60 * 1000; // 0 .60* 60 * 1000
function side_bar() {
  var append_html = `
   <div id='side_bar'>
      <button id='site_tracking' class=''>Site Tracking</button><br>
      <button id='wo_tracking'>wo tracking</button><br>
      <button id='se_tracking'> Engineer Tracking</button>
   </div>`;
  $("body").append(append_html);
  $("#site_status").draggable();
}
side_bar();
$("#site_tracking").click(function () {
  console.log("clicked");
  $("#site_status").toggle();
});
var status_table = `
    <table id="status_table" style="background: rgb(74 78 74 / 70%);border: solid 1px #69b963;">
  <tr>
  <th>Sites status</th>
  <th>Icon</th>
  <th>Count</th>
  </tr>
  <tr>
  <td>Online</td>
  <td><img src="${site_status_icons.online}"></td>
  <td id='site_count_online'>0</td>
  </tr>
  <tr>
  <td>offline</td>
  <td><img src="${site_status_icons.offline}"></td>
  <td id='site_count_offline'>0</td>
  </tr>
  <tr>
  <td>Pending Work</td>
  <td><img src="${site_status_icons.pendingWork}"></td>
  <td id='site_count_pending_work'>0</td>
  </tr>
  <tr>
  <td>Working</td>
  <td><img src="${site_status_icons.working}"></td>
  <td id='site_count_online_working'>0</td>
  </tr>
    </table>`;


$("#site_status").html(status_table);
