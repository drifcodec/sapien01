var append_html = `
   <div id='side_bar'>
      <button id='site_tracking' class=''>Site Tracking</button><br>
      <button id='wo_tracking'>wo tracking</button><br>
      <button id='se_tracking'> Engineer Tracking</button>
   </div>`;
$("body").append(append_html);
$("#site_status").draggable();

$("#site_tracking").click(function () {
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
  <td style="text-align:center" ><img src="${site_status_icons.online}"></td>
  <td style="text-align:center" id='site_count_online'>0</td>
  </tr>
  <tr>
  <td>offline</td>
  <td  style="text-align:center"><img src="${site_status_icons.offline}"></td>
  <td  style="text-align:center"id='site_count_offline'>0</td>
  </tr>
  <tr>
  <td>Pending Work</td>
  <td style="text-align:center"><img src="${site_status_icons.pendingWork}"></td>
  <td style="text-align:center" id='site_count_pending_work'>0</td>
  </tr>
  <tr>
  <td>Working</td>
  <td style="text-align:center"><img src="${site_status_icons.working}"></td>
  <td style="text-align:center" id='site_count_working'>0</td>
  </tr>
    </table>`;

$("#site_status").html(status_table);
