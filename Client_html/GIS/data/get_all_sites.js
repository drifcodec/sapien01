async function siteAPIGetlist(region) {
    var getSites = await getSitesApi(region)
    var loadSites = setSite(getSites)
    return loadSites
}
async function getSitesApi(region) {
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.SapionT}`
        }
    };
    return new Promise((resolve, reject) => {
        axios.get('/api/site/map_site_getList?region=' + region, config)
            .then(response => {
                return resolve(response.data)
            })
            .catch(error => console.error(error));
    });
}

function setSite(marker) {
    var site_all_list = [];
    for (i = 0; i < marker.length; i++) {
        var data = marker[i]
        site_data = {};
        site_lat = data.latitude * 1
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
        } else if (data.medioum_priority == 'medium') {
            vandalism_data.iconImage = vandalism_icons.medium
        } else if (data.priority == 'low') {
            vandalism_data.iconImage = vandalism_icons.low
        } else {
            vandalism_data.iconImage = vandalism_icons.low
        }
        if (typeof site_lat == 'number' && typeof site_lng == 'number') {
            site_all_list.push(site_data)
        }
    }
    return site_all_list
}
var device_contents = {
    content: function(device_id, status) {
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
    tooltip: function(device_id, status) {
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