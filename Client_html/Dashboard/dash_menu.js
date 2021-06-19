document.addEventListener("DOMContentLoaded", function () {

  var menu_list=localStorage.Sapian_menu?localStorage.Sapian_menu:''
  if (menu_list){
    menu_list = JSON.parse(localStorage.Sapian_menu)
    console.log("menu have data")
    console.log("menu have "+menu_list.length)
    create_menu(menu_list)
    window.localStorage.removeItem('Sapian_menu')
  }else {
    console.log("menu is set to null")
    console.log("menu set to null "+menu_list.length)
    var api_url = `/api/page_access/getMenuList/${localStorage.Sapion_id}`
    $.ajax({
      url: api_url,
      type: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: 'json',
      success: function (result) {
        if (result) {
          console.log('create new menu')
          localStorage.setItem("Sapian_menu", JSON.stringify(result.results));
          create_menu(result.results)
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
      }
    });
  }
  console.log("IN MENU------------>", menu_list)

  function create_menu(menu_list) {
    for (e = 0; e < menu_list.length; e++) {
      var parent_menu = menu_list[e].parent_menu
      var view = menu_list[e].view
      var page_name = menu_list[e].page
      var page_url = menu_list[e].url
      var href = '#'
      var target = ''
      var j_function = ''
     
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
     }
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

function get_Tab(page_name, page_url) {
  setTimeout(function () {
    addTab(page_name, page_url)
  }, 2000)
}