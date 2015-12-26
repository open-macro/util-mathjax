$(function() {

	function add_rows(n_rows, num_boxes) {
		for(var i = num_boxes; i < n_rows+num_boxes; i++) {
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
		num_boxes += n_rows;
		return num_boxes;
	};

	var num_boxes = 0;
	num_boxes = add_rows(5, num_boxes);

	$("#btn-add5").click(function() {
		num_boxes = add_rows(5, num_boxes);
	})

	$("#btn-submit").click(function() {
		// alert(num_boxes);
		for (var i = 0; i < num_boxes; i++) {
			// alert($("#tex"+i).val());
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

	$("#btn-download").click(function() {
		alert("download")
	})


})