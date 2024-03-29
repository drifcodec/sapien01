document.addEventListener("DOMContentLoaded", async function() {
    var menu_list = localStorage.Sapian_menu ? localStorage.Sapian_menu : ''
    var hostURL =window.location.origin
    if (menu_list) {
        menu_list = JSON.parse(localStorage.Sapian_menu)
        create_menu(menu_list)
        var newMenu = await getNewMenu()
        if (JSON.stringify(newMenu) != JSON.stringify(menu_list)) {
            console.log('not the same')
            window.location.reload();
        }
        localStorage.setItem("Sapian_menu", JSON.stringify(newMenu));
    } else {
        alert("error Please conatct Admin")

    }
    async function getNewMenu() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/page_access/getMenuList/${localStorage.Sapion_id}`, {})
                .then(response => {
                    resolve(response.data.results)
                })
                .catch(error => {
                    console.log("Error Occured . Contact Admin" + error)
                });
        })
    }

    
    function create_menu(menu_list) {
        for (e = 0; e < menu_list.length; e++) {
            var parent_menu = menu_list[e].parent_menu
            var view = menu_list[e].view
            var page_name = menu_list[e].page
            var source = menu_list[e].source
            var page_url=menu_list[e].url
            if (source==='Internal'){
                page_url =hostURL+"/"+menu_list[e].url
            }
            var href = '#'
            var target = ''
            var j_function = ''
            var concat_parent_menu = parent_menu.split(' ').join('_')
            if (view == 'new') {
                href = page_url
                target = 'target="_blank"'
            } else {
                j_function = `onclick="addTab('${page_name}','${page_url}')"`
            }

            if (parent_menu.length <= 0) {
                $('#list_menu').append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
            } else if ($('#list_menu').find("#" + concat_parent_menu + "_ul").length > 0) {

                $('#' + concat_parent_menu + "_ul").append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
            } else {
                $('#list_menu').append(`<li id="${concat_parent_menu}" class="has-sub"> <span class="dropdown-heading"> ${parent_menu} </span><ul id='${concat_parent_menu}_ul'></ul></li>`)
                $('#' + concat_parent_menu + "_ul").append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
            }
        }

    }
    let history = `
  <div>
      <table style="width:100%;margin-top:10px;font-size: 15px;text-align:left" border="1" borderColor="#cccccc">
          <thead>
              <tr style="background:#f0f0f0;">
                  <td  style="height:28px; padding:5px;text-align:center;width:33%">Notifictions <br></td>
                  <td style="height:28px; padding:5px;text-align:center;width:33%">Point Ranking<br></td>
                  <td style="height:28px; padding:5px;text-align:center;width:33%">Discussion<br></td>
              </tr>
          </thead>
          <tbody style=" font-size: 12px;">`
    history += `
              <tr>
                  <td id="notifications" style="height:28px; padding:5px"></td>
                  <td style="height:28px; padding:5px">${'-'}</td>
                  <td style="height:28px; padding:5px">${'-'}</td>
              </tr>`
    history += `</tbody>
      </table>
  </div><br><br>`
    $('.wrapper').prepend(history)
})