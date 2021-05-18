$(document).ready(function () {
    $(".account_circle").click(function(){
        console.log(localStorage)
        addTab('Personal Configuration',`http://localhost:3000/pg/web/user_mngmt/profile.html`)
        
    })
   
})