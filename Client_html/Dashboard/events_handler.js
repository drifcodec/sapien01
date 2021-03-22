$(document).ready(function () {
    $("#log_out").click(function () {
        console.log("clicked")
        localStorage.setItem("SapionT", "null")
        window.location.href = `http://localhost:3000/index.html`
    })
})