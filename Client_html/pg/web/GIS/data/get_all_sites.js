


async function siteAPIGetlist(region) {
  var getSites = await getSitesApi(region);
  if (getSites) {
    setSiteCount(getSites);
    return setSite(getSites);
  }
  return [];
}
async function getSitesApi(region) {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.SapionT}`,
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .get("/api/site/map_site_getList?region=" + region, config)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => {
        return resolve(null);
      });
  });
}

function setSiteCount(sites) {
  var site_count_online = 0;
  var site_count_offline = 0;
  var site_count_pending_work = 0;
  var site_count_working = 0;
  for (i = 0; i < sites.length; i++) {
    if (sites[i].status == 1) {
      site_count_online ++
    }
    if (sites[i].status == 0) {
      site_count_offline ++
    } 
    if (sites[i].status == 2) {
      site_count_working ++
    }
    if (sites[i].status == 3) {
      site_count_pending_work ++
    }
  }
  $("#site_count_online").text(site_count_online)
  $("#site_count_offline").text(site_count_offline)
  $("#site_count_pending_work").text(site_count_pending_work)
  $("#site_count_working").text(site_count_working)
}
function setSite(marker) {
  var site_all_list = [];
  for (i = 0; i < marker.length; i++) {
    var data = marker[i];
    var status =data.status==0?'offline':data.status==1?'online':data.status==2?'working':data.status==3?'Pending work':'Unknown'
    site_data = {
      coords : { lat:  data.latitude * 1, lng: data.longitude * 1 },
      id : data.site_id,
      type : "all_site",
      status :status

    };
    site_data.site_id = data.site_id;
    site_data.content = siteMapView.content(data.site_id,data.name, timeConvert(data.operation_time),data.operator,status);
    site_data.tooltip = siteMapView.tooltip(data.site_id,data.name, timeConvert(data.operation_time),data.operator,status);
    site_data.iconImage = towers_icons.medium;
    if (typeof (data.latitude * 1) == "number" && typeof (data.longitude * 1) == "number") {
      site_all_list.push(site_data);
    }
  }
  return site_all_list;
}
function timeConvert(inputTime) {
  var newDate = new Date(inputTime.toLocaleString());
  newDate.setHours(newDate.getHours())
  return newDate.toLocaleString();
}
var siteMapView = {
  content: function (site_id,site_name,time,operator,status) {
    var sites_content = ` 
      <div class="hoverTips">
     <div class="tipsTable">
       <table>
         <tbody>
           <tr>
           <td colspan="2" class="tipsTitle"><b>Site Details</b></td>
           </tr>
           <tr>
             <td class="tipsTitle"> Site ID: </td>
             <td title="${site_id}">${site_id}</td>
           </tr>
           <tr>
             <td class="tipsTitle"> Site Name: </td>
             <td title="${site_name}"> ${site_name} </td>
           </tr>
           <tr>
             <td colspan="2" class="tipsTitle"><b>Site Latest History</b></td>
           </tr>
           <tr>
             <td class="tipsTitle">Status: </td>
             <td title="${status}"> ${status} </td>
           </tr>
           <tr>
             <td class="tipsTitle">Operator: </td>
             <td title=""> ${operator} </td>
           </tr>
           <tr>
             <td class="tipsTitle">Operation Time: </td>
             <td title=""> ${time} </td>
           </tr>
         </tbody>
       </table>
       
       <button onclick="create_wo('${site_id}')">Create WO</button>
     </div>
    </div>`;
    return sites_content;
  },
  tooltip: function (site_id,site_name,time,operator,status) {
    var sites_tooltip = ` 
    <div class="hoverTips">
    <div class="tipsTable">
      <table>
        <tbody>
          <tr>
            <td class="tipsTitle"> Site ID: </td>
            <td title="${site_id}">${site_id}</td>
          </tr>
          <tr>
            <td class="tipsTitle"> Site Name: </td>
            <td title="${site_name}"> ${site_name} </td>
          </tr>
          <tr>
            <td class="tipsTitle"> Lastest Status: </td>
            <td title="${status}"> ${status} </td>
          </tr>
          <tr>
            <td class="tipsTitle"> Lastest Operator: </td>
            <td title=""> ${operator} </td>
          </tr>
          <tr>
            <td class="tipsTitle"> Lastest Operation Time: </td>
            <td title=""> ${time} </td>
          </tr>
        </tbody>
      </table>
    </div>
   </div>`;
    return sites_tooltip;
  },
};
