$('#overlay').click(function () {
  $('#overlay').fadeOut(200);
  $('#modal').fadeOut(200);
});
function create_wo(id) {
  $('#overlay').fadeIn(200);
  var model_wo = `<div id="modal">
                 <p>Site ID:</p>
                 <p><input id="wo_id"></p>
                 <button id="cancel_wo" onclick="cancel_wo()">Cancel</button>
                 <button id="sunmit_wo" onclick="sunmit_wo()">Submit</button>
                      </div>  `
  $('body').append(model_wo)
  $('#modal').fadeIn(200);
  $('#wo_id').attr("disabled", true)
  $("#wo_id").val(id);
}

function sunmit_wo() {
  console.log($("#wo_id").val())
} function cancel_wo() {
  console.log($("#wo_id").val())
  $('#overlay').fadeOut(200);
  $('#modal').fadeOut(200);
}
