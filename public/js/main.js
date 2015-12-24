$(function() {

	var num_boxes = 2;

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