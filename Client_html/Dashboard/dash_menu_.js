
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
  

/*  
 $(document).ready(function () {
  var userRole = ['Admin']
  var Page_accesss = [
    { parent_menu: 'Configuration', page: 'Users', url: 'http://localhost:3000/Pages/User.html', view: "tab", roles: ['SE','GIS'] },
    { parent_menu: 'Configuration', page: 'Role management', url: 'http://localhost:3000/Pages/role_management.html', view: "tab", roles: ['SE'] },
    { parent_menu: 'Configuration', page: 'Parent menu', url: 'http://localhost:3000/Pages/parent_menu.html', view: "tab", roles: ['SE'] },
    { parent_menu: 'Configuration', page: 'Page Access', url: 'http://localhost:3000/Pages/page_access.html', view: "tab", roles: ['SE'] },
    { parent_menu: 'Operator_Center', page: 'TRO Command', url: 'http://localhost:3000/Pages/roll_out_logictic.html', view: "tab", roles: ['SE'] },
    { parent_menu: 'Se_WF', id: 1, page: 'main', url: 'http://localhost:3000/Dashboard/dash_index.html', roles: ['SE']  },
    { parent_menu: 'Se_WF', id: 2, page: 'se_test', url: 'http://www.se_test.com', roles:['SE'] },
    { parent_menu: 'Se_WF', id: 3, page: 'se_report', url: 'http://www.reporting.com', roles: ['SE'] },
    { parent_menu: "BASIC", id: 2, page: 'basic rp', url: 'www.google.com' },
    { parent_menu: 'GIS', page: 'GIS', url: 'http://localhost:3000/GIS/GIS%20v3.html', view: "new" , roles: ['GIS'] },
  ]
  var menu_list=[
  {"parent_menu":"Configuration","page":"Users","url":"http://localhost:3000/Pages/User.html","view":"tab","page_roles":["super_admin","admin"]},
  {"parent_menu":"Configuration","page":"Role management","url":"http://localhost:3000/Pages/role_management.html","view":"tab","page_roles":["super_admin","admin"]},
  {"parent_menu":"Configuration","page":"Parent menu","url":"http://localhost:3000/Pages/parent_menu.html","view":"tab","page_roles":["super_admin","admin"]},
  {"parent_menu":"Configuration","page":"Page Access","url":"http://localhost:3000/Pages/page_access.html","view":"tab","page_roles":["super_admin","admin"]},
  {"parent_menu":"GIS","page":"MGO","url":"http://localhost:3000/GIS/GIS v3.html","view":"new","page_roles":["dev"]}]

 // var menu_list = []

  for (i = 0; i < Page_access.length; i++) {
    page_roles = Page_access[i].roles
    if(page_roles&&userRole){
      var permitionallowed=permitionChecker(userRole,page_roles)
      if (userRole.includes('Admin')) {
        menu_list.push(Page_access[i])
      }else if (permitionallowed ){
        menu_list.push(Page_access[i])
      } else {
      }
    }

  }
  function permitionChecker(array1,array2) {
    for(let i = 0; i < array1.length; i++) {
        for(let j = 0; j < array2.length; j++) {
            if(array1[i] === array2[j]) {
                return true;
            }
        }
    }
    return false;
} 
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
     if(parent_menu.length<=0){
       //if no menu ,insert page as menu
      $('#list_menu').append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
     }
      else if ($('#list_menu').find("#" + menu_list[e].parent_menu+"_ul").length > 0) {
        $('#' + parent_menu+"_ul").append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
      } else {
        $('#list_menu').append(`<li id="${menu_list[e].parent_menu}" class="has-sub"> <span class="dropdown-heading"> ${menu_list[e].parent_menu} </span><ul id='${menu_list[e].parent_menu}_ul'></ul></li>`)
        $('#'+menu_list[e].parent_menu+"_ul").append(`<li ><a  href='${href}' ${target} ${j_function}>${page_name}</a></li>`)
      }
     }


})*/