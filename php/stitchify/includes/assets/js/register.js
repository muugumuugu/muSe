
$(document).ready(function(){
	
	$("#hideLogin").click(function(){
		$("#loginform").hide();
		$("#registerform").show();
	});

	$("#hideRegister").click(function(){
		$("#loginform").show();
		$("#registerform").hide();
	});
});
