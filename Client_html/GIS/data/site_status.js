var device_list = [];
var device_list_storage = [];
var counter_site = 0.12 * 60 * 1000 // 0 .60* 60 * 1000
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
side_bar()
$('#site_tracking').click(function() {
    console.log("clicked")
    $('#site_status').toggle();
})
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
      <td id='online_count'>0</td>
      </tr>
      <tr>
      <td>offline</td>
      <td><img src="${site_status_icons.offline}"></td>
      <td id='offline_count'>0</td>
      </tr>
      <tr>
      <td>Busy</td>
      <td><img src="${site_status_icons.maintenance}"></td>
      <td id='busy_count'>0</td>
      </tr>
      <tr>
      <td>Dead</td>
      <td><img src="${site_status_icons.dead}"></td>
      <td id='dead_count'>0</td>
      </tr>
    </table>`

$('#site_status').html(status_table)