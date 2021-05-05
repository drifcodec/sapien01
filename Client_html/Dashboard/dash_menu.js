
$(document).ready(function () {
  /* location.reload(function(){
    
    localStorage.setItem("sapian_reload_menu", "null")
  }) */
  
  var was_loaded = false
  var menu_list = JSON.parse(localStorage.Sapian_menu)
  console.log("IN MENU bbbb ------------>")
  
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

      get_Tab(page_name, page_url)
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
  

})

function get_Tab(page_name,page_url) {
  setTimeout(function(){
    addTab(page_name, page_url)
  },2000)
}
