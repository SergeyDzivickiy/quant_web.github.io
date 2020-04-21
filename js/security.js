
$('#ecryption').on('click', function () {
	var aes_field = document.getElementById('encrypt_key');
	if ( $(this).is(':checked') ) {
		aes_field.disabled = false;
	} else {
		aes_field.disabled = true;
	}
})

$('#sec_apply').on('click', function () {

	alert("test");
});


$('.password-control').click(function(){
	if ($('#user_pass').attr('type') == 'password'){

		$(this).addClass('view');
		$('#user_pass').attr('type', 'text');

	} else {
		$(this).removeClass('view');
		$('#user_pass').attr('type', 'password');
	}
	
	return false;
});


$('.password-control-key').click(function(){
	if ($('#encrypt_key').attr('type') == 'password'){
		$(this).addClass('view');
		$('#encrypt_key').attr('type', 'text');

	} else {
		$(this).removeClass('view');
		$('#encrypt_key').attr('type', 'password');
	}
	
	return false;
});



//*******************WEB SOCKET***********************************//
function get_appropriate_ws_url(extra_url)
{
	var pcol;
	var u = document.URL;

	if (u.substring(0, 5) === "https") {
		pcol = "wss://";
		u = u.substr(8);
	} else {
		pcol = "ws://";
		if (u.substring(0, 4) === "http")
			u = u.substr(7);
	}

	u = u.split("/");

	/* + "/xxx" bit is for IE10 workaround */

	return pcol + u[0] + "/" + extra_url;
}

function new_ws(urlpath, protocol)
{
	return new WebSocket(urlpath, protocol);
}

document.addEventListener("DOMContentLoaded", function() {

	var ws = new_ws(get_appropriate_ws_url(""), "lws-minimal");
	ws.binaryType = "blob";
	try {
		ws.onopen = function() {
			console.log("Connected");
			console.log(ws);
		};

		ws.onmessage =function got_packet(msg) {
			console.log("Data from Server: "  + msg.data);
			var sizeInBytes = (msg.data).size;
		};
		
		ws.onclose = function(){
			console.log("Connection Close");
		};
	} catch(exception) {
		alert("<p>Error " + exception);  
	}
	

}, false);
//*******************WEB SOCKET***********************************//