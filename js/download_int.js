
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

var MyBlobBuilder = function() {
	this.parts = [];
}

MyBlobBuilder.prototype.append = function(part) {
	this.parts.push(part);
  this.blob = undefined; // Invalidate the blob
};

MyBlobBuilder.prototype.getBlob = function() {
	if (!this.blob) {
		this.blob = new Blob(this.parts, { type: "application/octet-binary"});
	}
	return this.blob;
};

var myBlobBuilder = new MyBlobBuilder();

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
			if(sizeInBytes <= 5)
			{
				console.log("command from server");
				//download(blob);
				var bb = myBlobBuilder.getBlob();
				downloadFile(bb, "new.mp4");

			}else if(sizeInBytes> 1000){
					//console.log("Contains", sizeInBytes, "bytes.");
					//download(msg.data);
					myBlobBuilder.append(msg.data);
				}else{
					console.log("error command"+ sizeInBytes);
				}

			};
			
			ws.onclose = function(event){
				if (event.wasClean) {
					console.log('Соединение закрыто чисто');
				} else {
			    console.log('Обрыв соединения'); // например, "убит" процесс сервера
			}
			console.log('Код: ' + event.code + ' причина: ' + event.reason);
		};
	} catch(exception) {
		console.log("<p>Error " + exception);  
	}


	$("#download_mp4_1").click(function () {
		$('.preloader').addClass('activev');
		ws.send("0x74");
	});

}, false);



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
		//ws.send("0xff");

	}
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}


	$('p').each(function (index, value){

		if( value.textContent == ".mp4")
		{
			document.querySelectorAll('[id=raw_form]').forEach(element=> { 
				element.disabled = true;
				element.style.background = 'gray';
			});
		}
	});
