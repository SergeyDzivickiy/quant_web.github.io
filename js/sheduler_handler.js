	$('#shed_save').click(function(){
		alert("test");
	});


	var collapse_m = true, collapse_thue = true, collapse_w = true, collapse_thur = true, collapse_f = true, collapse_sat = true, collapse_sun = true;

	$('#plus-monday').click(function(){
		if(collapse_m == true){
			document.getElementById("included-sheduler-monday").style.display='grid';
			document.getElementById("included-sheduler-date-monday").style.display='grid';
			collapse_m = false;
			document.getElementById("ms").className = "fa fa-arrow-circle-up";
		}else{
			document.getElementById("included-sheduler-monday").style.display='none';
			document.getElementById("included-sheduler-date-monday").style.display='none';
			collapse_m = true;
			document.getElementById("ms").className = "fa fa-arrow-circle-down";
		}

	}); 

	$('#plus-thuesday').click(function(){
		if(collapse_thue == true){
			document.getElementById("included-sheduler-thuesday").style.display='grid';
			document.getElementById("included-sheduler-date-thuesday").style.display='grid';
			collapse_thue = false;
			document.getElementById("thues").className = "fa fa-arrow-circle-up";
		}else{
			document.getElementById("included-sheduler-thuesday").style.display='none';
			document.getElementById("included-sheduler-date-thuesday").style.display='none';
			collapse_thue = true;
			document.getElementById("thues").className = "fa fa-arrow-circle-down";
		}

	});   

	$('#plus-wednesday').click(function(){
		if(collapse_w == true){
			document.getElementById("included-sheduler-wednesday").style.display='grid';
			document.getElementById("included-sheduler-date-wednesday").style.display='grid';
			collapse_w = false;
			document.getElementById("ws").className = "fa fa-arrow-circle-up";
		}else{
			document.getElementById("included-sheduler-wednesday").style.display='none';
			document.getElementById("included-sheduler-date-wednesday").style.display='none';
			collapse_w = true;
			document.getElementById("ws").className = "fa fa-arrow-circle-down";
		}

	});  

	$('#plus-thursday').click(function(){
		if(collapse_thur == true){
			document.getElementById("included-sheduler-thursday").style.display='grid';
			document.getElementById("included-sheduler-date-thursday").style.display='grid';
			collapse_thur = false;
			document.getElementById("thurs").className = "fa fa-arrow-circle-up";
		}else{
			document.getElementById("included-sheduler-thursday").style.display='none';
			document.getElementById("included-sheduler-date-thursday").style.display='none';
			collapse_thur = true;
			document.getElementById("thurs").className = "fa fa-arrow-circle-down";
		}

	}); 

	$('#plus-friday').click(function(){
		if(collapse_f == true){
			document.getElementById("included-sheduler-friday").style.display='grid';
			document.getElementById("included-sheduler-date-friday").style.display='grid';
			collapse_f = false;
			document.getElementById("fs").className = "fa fa-arrow-circle-up";
		}else{
			document.getElementById("included-sheduler-friday").style.display='none';
			document.getElementById("included-sheduler-date-friday").style.display='none';
			collapse_f = true;
			document.getElementById("fs").className = "fa fa-arrow-circle-down";
		}

	});

	$('#plus-saturday').click(function(){
		if(collapse_sat == true){
			document.getElementById("included-sheduler-saturday").style.display='grid';
			document.getElementById("included-sheduler-date-saturday").style.display='grid';
			collapse_sat = false;
			document.getElementById("sats").className = "fa fa-arrow-circle-up";
		}else{
			document.getElementById("included-sheduler-saturday").style.display='none';
			document.getElementById("included-sheduler-date-saturday").style.display='none';
			collapse_sat = true;
			document.getElementById("sats").className = "fa fa-arrow-circle-down";
		}

	}); 
	$('#plus-sunday').click(function(){
		if(collapse_sun == true){
			document.getElementById("included-sheduler-sunday").style.display='grid';
			document.getElementById("included-sheduler-date-sunday").style.display='grid';
			collapse_sun = false;
			document.getElementById("suns").className = "fa fa-arrow-circle-up";
		}else{
			document.getElementById("included-sheduler-sunday").style.display='none';
			document.getElementById("included-sheduler-date-sunday").style.display='none';
			collapse_sun = true;
			document.getElementById("suns").className = "fa fa-arrow-circle-down";
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