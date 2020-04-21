

$('#en_cofdm').on('click', function () {
	if ( $(this).is(':checked') ) {
		cofdm_cn1.disabled = false;
		cofdm_cn2.disabled = false
		cofdm_cn3.disabled = false
		cofdm_cn4.disabled = false
	} else {
		cofdm_cn1.disabled = true;
		cofdm_cn2.disabled = true;
		cofdm_cn3.disabled = true;
		cofdm_cn4.disabled = true;
	}
})

for (var i = 0; i<=49; i++) {
	let newOption = new Option (i, i);
	cofdm_cn1.append(newOption);
}
for (var i = 0; i<=49; i++) {
	let newOption = new Option (i, i);
	cofdm_cn2.append(newOption);
}
for (var i = 0; i<=49; i++) {
	let newOption = new Option (i, i);
	cofdm_cn3.append(newOption);
}
for (var i = 0; i<=49; i++) {
	let newOption = new Option (i, i);
	cofdm_cn4.append(newOption);
}

$('#cofdm_apply').on('click', function () {
	var cofdm_cn1 = document.getElementById("cofdm_cn1").value;
	var cofdm_cn2 = document.getElementById("cofdm_cn2").value;
	var cofdm_cn3 = document.getElementById("cofdm_cn3").value;
	var cofdm_cn4 = document.getElementById("cofdm_cn4").value;
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