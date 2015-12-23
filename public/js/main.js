$(function() {

	$("#btn-submit").click(function() {
		var pdata = {
		    "format": "TeX",
		    "math": $('#tex-eqn').val(),
	    	"svg":true,
	    	"mml":false,
	    	"png":false,
	    	"speakText": true,
	    	"speakRuleset": "mathspeak",
	    	"speakStyle": "default",
	    	"ex": 6,
	    	"width": 1000000,
	    	"linebreaks": false,
	    };
	    var datastring = JSON.stringify(pdata);
		
		$.ajax({
			url: "/submit",
			type: "POST",
			data: datastring,
			contentType: "application/json",
			success: function() {},
			failure: function() { alert('error'); }
	    	}).done(function(data) {
	    		//alert(data.fname);
          $("#svg-holder").attr("src", "svg/" + data.fname + ".svg");
	    	});
	});

})