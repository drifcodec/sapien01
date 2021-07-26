$('#overlay').click(function() {
    $('#overlay').fadeOut(200);
    $('#modal').fadeOut(200);
});

function create_wo(id) {
    $('#overlay').fadeIn(200);
    var model_wo = `<div id="modal">
    <iframe src="/pg/web/roll_out/create_rollout.html?id="${id}" heigth="100%" title="W3Schools Free Online Web Tutorials">
    </iframe> </div>`
    $('body').append(model_wo)
    $('#modal').fadeIn(200);
    $('#wo_id').attr("disabled", true)
    $("#wo_id").val(id);
}

function sunmit_wo() {
    console.log($("#wo_id").val())
}

function cancel_wo() {
    console.log($("#wo_id").val())
    $('#overlay').fadeOut(200);
    $('#modal').fadeOut(200);
}