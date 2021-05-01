

var site_all_list = [];
var counter_site = 0.12 * 60 * 1000 // 0 .60* 60 * 1000

setInterval(function () {
    load_all_site()
    console.log("loop")
}, counter_site
)
/* 
side_bar() */
load_all_site()
/* function side_bar() {
  var append_html = `
   <div id='side_bar'>
      <button id='site_tracking' class=''>Site Tracking</button><br>
      <button id='wo_tracking'>wo tracking</button><br>
      <button id='se_tracking'> Engineer Tracking</button>
   </div>`
  $('body').append(append_html)
  $("#site_status").draggable()
} */
function load_all_site() {
    axios.get('http://localhost:3000/api/site/site_getList')
        .then(response => {
            console.log(response.data)
            show_site(response.data)
        })
        .catch(error => console.error(error));
};

function show_site(marker) {
    for (i = 0; i < marker.length; i++) {
        var data = marker[i]
        site_data = {};
        site_lat = data.lattiude * 1
        site_lng = data.longitude * 1
        site_data.coords = { lat: site_lat, lng: site_lng }
        site_data.id = data.site_id
        site_data.type = "all_site"
        site_data.status = data.status
        site_data.site_id = data.site_id
        site_data.content = device_contents.content(data.site_id, data.site_name)
        site_data.tooltip = device_contents.tooltip(data.site_id, data.site_name)
        if (data.site_id) {
          site_data.iconImage = towers_icons.medium
        } /* else if (data.medioum_priority == 'medium') {
          vandalism_data.iconImage = vandalism_icons.medium
        } else if (data.priority == 'low') {
          vandalism_data.iconImage = vandalism_icons.low
        } else {
          vandalism_data.iconImage = vandalism_icons.low
        } */
        if (typeof site_lat == 'number' && typeof site_lng == 'number') {
            site_all_list.push(site_data)
        }


      } 
     }

