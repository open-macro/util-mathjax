$(function() {

	var num_boxes = 5;
	for (var i = 0; i < num_boxes; i++) {
	    var input_img = "<div class='row input-img'>" +
	    "<div class='col-md-6'>" + 
	    "<input type='text' class='form-control' id='tex" + i + "' placeholder='y_t = a_t k_t^{\alpha} n_t^{1-\alpha}'>" + 
        "</div>" +
        "<div class='col-md-6'>" +
        "<div><img id='svg" + i + "' src=''></div>" +
        "</div>" +
        "</div>"
        $("#input-img-holder").append(input_img);
	}

	$("#btn-submit").click(function() {
		for (var i = 0; i < num_boxes; i++) {
			$.ajax({
				url: "/submit",
				type: "POST",
				data: JSON.stringify(
					{"math": $("#tex"+i).val(),
					"idx": i}
					),
				contentType: "application/json",
				success: function() {},
				failure: function() { alert('error'); }
			}).done(function(data) {
				$("#svg"+data.idx).attr("src", "svg/" + data.fname + ".svg");
			});
		}
	});
})