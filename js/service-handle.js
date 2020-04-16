n =  new Date();
var	y = n.getFullYear();
var	m = n.getMonth() + 1;
var	d = n.getDate();
var	hr = n.getHours();
var	min = n.getMinutes();
var sec = n.getSeconds();
document.getElementById("date").innerHTML = d + "/" + m + "/" + y + " " + hr + ":"+ min + ":"+ sec;

service_update_time();

function service_update_time() {
	time = document.getElementById('date');
	time.innerHTML = osdGetTimeString();
	setTimeout(service_update_time, 1000);
}

function osdGetTimeString() {
	var helper = (val) => {
		return (val ? (val > 9 ? val : ("0" + val)) : "00" );
	};

	var today = new Date();	
	var hours = helper(today.getHours());
	var minutes = helper(today.getMinutes());
	var seconds = helper(today.getSeconds());
	var date = helper(today.getDate());
	var month = helper(today.getMonth() + 1);
	var year = helper(today.getFullYear());

	return (date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds);
}

$('#reset').on('click', function () {
	var is_reset = confirm("Reset device setting ?");
	if (is_reset) 
	{
		alert("reset");
	}else{
		alert("no reset");
	}
});


$('#reboot').on('click', function () {
	var is_reboot = confirm("Reboot device?");
	if (is_reboot) 
	{
		alert("reboot");
	}else{
		alert("no reboot");
	}
});

$('#sync_butt').on('click', function () {
	alert("sync");
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
	

	function sendFile()
	{
		var file = document.getElementById('file_update');

		if(file.files.length)
		{
			var reader = new FileReader();
			reader.onload = function(e)
			{
            //document.getElementById('outputDiv').innerHTML = e.target.result;
            ws.send(e.target.result);
        };
        reader.readAsArrayBuffer(file.files[0]);
    }
}
$("#upd_firm").click(function(e) {
	alert("update");
	e.preventDefault();
	sendFile();
});	

}, false);
//*******************WEB SOCKET***********************************//