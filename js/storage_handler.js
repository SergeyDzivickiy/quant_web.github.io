	

	var progress_external = document.querySelectorAll("progress");
	var external_storage_value = document.getElementById("external_storane").value;
	var internal_storage_value = document.getElementById("internal_storage").value;

	if(external_storage_value>=30){
		progress_external[0].style.setProperty("--c", "green");
	}

	if(external_storage_value>=50){
		progress_external[0].style.setProperty("--c", "orange");
	}
	if(external_storage_value>=80){
		progress_external[0].style.setProperty("--c", "red");
	}
	if(internal_storage_value>=30){
		progress_external[1].style.setProperty("--c", "green");
	}

	if(internal_storage_value>=50){
		progress_external[1].style.setProperty("--c", "orange");
	}
	if(internal_storage_value>=80){
		progress_external[1].style.setProperty("--c", "red");
	}

$('#quick_sd').on('click', function () {
		alert("Quick formating start");
});
$('#full_sd').on('click', function () {
		alert("Full formating start");
});

$('#quick_int').on('click', function () {
		alert("Quick formating start");
});
$('#full_int').on('click', function () {
		alert("Full formating start");
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

	var ws = new_ws("ws://10.0.1.27:7681", "lws-minimal");
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