$(function() {

	function get_saveas_names() {
		saveas_names = [];
		for (var i=0; i<num_boxes; i++) {
			if ($("#saveas"+i).val() == "")
				saveas_names.push("eqn" + pad(i, 3));
			else 
				saveas_names.push($("#saveas"+i).val());				
		}
		return saveas_names;
	}

	function pad(num, size) {
		var s = "000000000" + num;
		return s.substr(s.length-size);
	}

	function add_rows(n_rows, num_boxes) {
		for(var i = num_boxes; i < n_rows+num_boxes; i++) {
			var input_img = "<div class='row input-img'>" +
			"<div class='col-md-1 text-center'>" + i + "</div>" + 
			"<div class='col-md-4'>" + 
			"<input type='text' class='form-control' id='tex" + i + 
			"' placeholder='y_t = a_t k_t^{\alpha} n_t^{1-\alpha}'>" + 
			"</div>" +
			"<div class='col-md-5'>" +
			"<div><img id='svg" + i + "' src=''></div>" +
			"</div>" +
			"<div class='col-md-2'>" + 
			"<input type='text' class='form-control' id='saveas" + i + 
			"' placeholder='eqn" + pad(i,3) + "'>" + 
			"</div>" + 
			"</div>"
			$("#input-img-holder").append(input_img);
		}
		num_boxes += n_rows;
		return num_boxes;
	};

	var num_boxes = 0;
	var svg_names = [];
	num_boxes = add_rows(5, num_boxes);

	$("#btn-add5").click(function() {
		num_boxes = add_rows(5, num_boxes);
	})

	$("#btn-submit").click(function() {
		for (var i = 0; i < num_boxes; i++) {
			if ($("#tex"+i).val() != "") {
				$.ajax({
					url: "/submit",
					type: "POST",
					data: JSON.stringify({
						"math": $("#tex"+i).val(),
						"idx": i
					}),
					contentType: "application/json",
					success: function() {},
					failure: function() { alert('error'); }
				}).done(function(data) {
					svg_names[data.idx] = data.fname;
					$("#svg"+data.idx).attr("src", "svg/" + data.fname + ".svg");
					// alert(svg_names);
					$.ajax({
						url: "/zip",
						type: "POST",
						data: JSON.stringify({
							"svg_names": svg_names,
							"saveas_names": get_saveas_names()
						}),
						contentType: "application/json",
						success: function() {},
						failure: function() {}
					}).done(function(data) {
						$("#btn-download").removeClass("disabled");
						/* Note: this doesn't actually add or remove functionality,
						it just changes the display class */
					});
				});
			}
		}
	});

	$("#btn-download").click(function() {
		// alert('download');
	})


})