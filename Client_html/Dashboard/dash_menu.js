
$(document).ready(function () {
  var menu_list = JSON.parse(localStorage.Sapian_menu)
  console.log("IN MENU bbbb ------------>",localStorage.Sapion_id)
  
  var reload_page_list =reload_tabs()
  function reload_tabs(){
    if (localStorage && localStorage.sapian_reload_menu){
      return (localStorage.sapian_reload_menu).split(",")
    }else {return ''}
  }
  console.log("IN MENU ------------>" + reload_page_list[0])

  //localStorage.setItem("sapian_reload_menu","null")
  //addTab(title,url)
  for (e = 0; e < menu_list.length; e++) {
    var parent_menu = menu_list[e].parent_menu
    var view = menu_list[e].view
    var page_name = menu_list[e].page
    var page_url = menu_list[e].url
    var href = '#'
    var target = ''
    var j_function = ''
    if (reload_page_list.includes(page_name)) {

     // get_Tab(page_name, page_url)
    }
    if (view == 'new') {
      href = page_url
      target = 'target="_blank"'
    } else {
      j_function = `onclick="addTab('${page_name}','${page_url}')"`
    }
    if (parent_menu.length <= 0) {
      $('#list_menu').append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
    }
    else if ($('#list_menu').find("#" + menu_list[e].parent_menu + "_ul").length > 0) {
      $('#' + parent_menu + "_ul").append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
    } else {
      $('#list_menu').append(`<li id="${menu_list[e].parent_menu}" class="has-sub"> <span class="dropdown-heading"> ${menu_list[e].parent_menu} </span><ul id='${menu_list[e].parent_menu}_ul'></ul></li>`)
      $('#' + menu_list[e].parent_menu + "_ul").append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
    }

    // <span class="dropdown-heading"> Configuration <i class="material-icons d-arrow">keyboard_arrow_down</i></span>
  }
  

  let history = `
  <div>
      <table style="width:100%;margin-top:10px;font-size: 15px;text-align:left" border="1" borderColor="#cccccc">
          <thead>
              <tr style="background:#f0f0f0;">
                  <td  style="height:28px; padding:5px;text-align:center;width:33%">Notifictions <br>公告栏</td>
                  <td style="height:28px; padding:5px;text-align:center;width:33%">Point Ranking<br>积分排行</td>
                  <td style="height:28px; padding:5px;text-align:center;width:33%">Discussion<br>在线讨论</td>
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

function get_Tab(page_name,page_url) {
  setTimeout(function(){
    addTab(page_name, page_url)
  },2000)
}
/* 
$(document).ready(async function () {
  var menu_list = await load_menu()
  console.log("-----menu_list---->",menu_list)
  for (e = 0; e < menu_list.length; e++) {
    var parent_menu = menu_list[e].parent_menu
    var view = menu_list[e].view
    var page_name =menu_list[e].page
    var page_url  = menu_list[e].url
    var href = '#'
    var target = ''
    var j_function = ''
    if (reload_page_list.includes(page_name)) {

      // get_Tab(page_name, page_url)
    }
    if (view == 'new') {
      href = page_url
      target = 'target="_blank"'
    } else {
      j_function = `onclick="addTab('${page_name}','${page_url}')"`
    }
    if (parent_menu.length <= 0) {
      $('#list_menu').append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
    }
    else if ($('#list_menu').find("#" + menu_list[e].parent_menu + "_ul").length > 0) {
      $('#' + parent_menu + "_ul").append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
    } else {
      $('#list_menu').append(`<li id="${menu_list[e].parent_menu}" class="has-sub"> <span class="dropdown-heading"> ${menu_list[e].parent_menu} </span><ul id='${menu_list[e].parent_menu}_ul'></ul></li>`)
      $('#' + menu_list[e].parent_menu + "_ul").append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
    }

    // <span class="dropdown-heading"> Configuration <i class="material-icons d-arrow">keyboard_arrow_down</i></span>
  }
  async function load_menu() {
    return new Promise((resolve, reject) => {
      var api_url = `http://localhost:3000/api/page_access/getMenuList/${localStorage.Sapion_id}`
      $.ajax({
        url: api_url,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (result) {
          if (result) {
            //console.log('the result :' + JSON.stringify(result.results))
            //localStorage.setItem("Sapian_menu", JSON.stringify(result.results));
            return resolve(result)

          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
      });
    });

  }
  var reload_page_list = reload_tabs()
  function reload_tabs() {
    if (localStorage && localStorage.sapian_reload_menu) {
      return (localStorage.sapian_reload_menu).split(",")
    } else { return '' }
  }
  console.log("IN MENU ------------>" + reload_page_list[0])


  let history = `
  <div>
      <table style="width:100%;margin-top:10px;font-size: 15px;text-align:left" border="1" borderColor="#cccccc">
          <thead>
              <tr style="background:#f0f0f0;">
                  <td  style="height:28px; padding:5px;text-align:center;width:33%">Notifictions <br>公告栏</td>
                  <td style="height:28px; padding:5px;text-align:center;width:33%">Point Ranking<br>积分排行</td>
                  <td style="height:28px; padding:5px;text-align:center;width:33%">Discussion<br>在线讨论</td>
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

function get_Tab(page_name, page_url) {
  setTimeout(function () {
    addTab(page_name, page_url)
  }, 2000)
} */

