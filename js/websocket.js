function get_appropriate_ws_url(extra_url)
{
	var pcol;
	var u = document.URL;

	/*
	 * We open the websocket encrypted if this page came on an
	 * https:// url itself, otherwise unencrypted
	 */

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

		var ws = new WebSocket("wss://echo.websocket.org");
		try {
			ws.onopen = function() {
				console.log("Connected");
				console.log(ws);
			};
			
			ws.onmessage =function got_packet(msg) {
				console.log("Data from Server: "  + msg.data);
			};
			
			ws.onclose = function(){
				console.log("Connection Close");
			};
		} catch(exception) {
			alert("<p>Error " + exception);  
		}
		
		function sendfirm()
		{
			let form = document.forms.firmware;
			let elem_form = form.elements.upd_firm;
			ws.send(0x77);
			ws.send(elem_form);
		}

		function sendrec()
		{
			ws.send(0x74);
			ws.send(document.getElementById("time").value+document.getElementById("quality").value+document.getElementById("format").value);
		}

		$("#firmware").submit(function(e) {
			e.preventDefault();
			sendfirm();
		});

		
		document.getElementById("send").addEventListener("click", sendrec);
	}, false);

