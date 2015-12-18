$(function() {

	$("#btn-submit").click(function() {
		//var tex_eqn = $('#tex-eqn').val();
		$.ajax({
			url: "/submit",
			type: "POST",
			data: JSON.stringify({ tex: $('#tex-eqn').val() }),
			contentType: "application/json",
			success: function() {},
			failure: function() { 
		    	alert('error while writing parameters'); }
	    	});
	});

})