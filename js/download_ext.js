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
			//	console.log("Data from Server: "  + msg.data);
			var sizeInBytes = (msg.data).size;
				//var reader = new FileReader();
				console.log("Contains", sizeInBytes, "bytes.");
				download(msg.data);
			};
			
			ws.onclose = function(){
				console.log("Connection Close");
			};
		} catch(exception) {
			alert("<p>Error " + exception);  
		}
		

		$("#download_mp4_ext_1").click(function () {
			$('.preloader').addClass('activev');
			ws.send("0x74");
		});

		function download(data)
		{
			const blob = new Blob ([data], {type:'application/octet-binary'});

			downloadFile(blob, "newfile.mp4");

		}

		function downloadFile(blob, filename)
		{
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = filename;
			a.click();
			a.remove();
			document.addEventListener("focus", w=>{window.URL.revokeObjectURL(blob)});

			sleep(1000).then(function() {
				$('.preloader').removeClass('activev');
			});

			ws.send("0xff");

		}
	}, false);


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(1000*5).then(function() {
	$('.preloader').removeClass('activev');
});


$('p').each(function (index, value){

	if( value.textContent == ".mp4")
	{
		document.querySelectorAll('[id=raw_form]').forEach(element=> { 
			element.disabled = true;
			element.style.background = 'gray';
		});
	}
});