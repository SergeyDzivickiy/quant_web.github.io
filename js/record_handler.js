

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
				let serv_data = new Array();
			serv_data.push(msg.data);
			console.log("SERV DATA: " + serv_data);

			 // $('body').find('input, select').each( function(){
			 // 	for (var i = 0; i <= serv_data.length; i++) {
			 // 		$(this).value =  serv_data[i];
			 // 		console.log("value = " + serv_data[i]);   
			 // 	}
	   //      console.log("value = " + (this).value);             
	   //  });
		};
		
		ws.onclose = function(){
			console.log("Connection Close");
		};
	} catch(exception) {
		alert("<p>Error " + exception);  
	}

	$('#rec_send').on('click', function () {

		let rec_data = new Array();
		$('div select').each(function() {
			console.log($(this).val());
			rec_data.push($(this).val());
		});

		$('div input').each(function() {
			if ($(this).is(':checked')){
				console.log(1);
				rec_data.push(1);
			}else{
				console.log(0);
				rec_data.push(0);
			}
		// console.log($(this).val());
	});
		console.log(rec_data);
		ws.send(rec_data);
	});

}, false);
//*******************WEB SOCKET***********************************//