
$(document).ready(function () {

  setTimeout(function(){
    load_menu()
  },6000)
  function load_menu(){
    axios.get(`http://localhost:3000/api/page_access/getMenuList/${localStorage.Sapion_id}`)
    .then(results => {
      var menu_list = results.data.results
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
          $('#list_menu').append(`<li id="${menu_list[e].parent_menu}" class="has-sub"> <span class="dropdown-heading"> ${menu_list[e].parent_menu} <i class="material-icons d-arrow">keyboard_arrow_down</i> </span><ul id='${menu_list[e].parent_menu}_ul' style="display: block;"></ul></li>`)
          $('#' + menu_list[e].parent_menu + "_ul").append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
        }
        
    // <span class="dropdown-heading"> Configuration <i class="material-icons d-arrow">keyboard_arrow_down</i></span>
      }
    })
    .catch(error => {
      alert(error)
    });

  }
  })
  