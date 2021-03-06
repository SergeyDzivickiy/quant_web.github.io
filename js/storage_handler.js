	

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
	var quick_form_sd = confirm("Format MicroSD?");
	if (quick_form_sd) 
	{
		alert("Quick formating start");
	}else{
		alert("no format");
	}
});
$('#full_sd').on('click', function () {
	var full_form_sd = confirm("Format MicroSD?");
	if (full_form_sd) 
	{
		alert("Full formating start");
	}else{
		alert("no format");
	}
});

$('#quick_int').on('click', function () {
	var quick_form_emmc = confirm("Format eMMC?");
	if (quick_form_emmc) 
	{
		alert("Quick formating start");
	}else{
		alert("no format");
	}
});
$('#full_int').on('click', function () {
	var full_form_emmc = confirm("Format eMMC?");
	if (full_form_emmc) 
	{
		alert("Full formating start");
	}else{
		alert("no format");
	}
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