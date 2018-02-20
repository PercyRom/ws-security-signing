var xcandidate = [];


function GetComputerName() {
    try {
        var network = new ActiveXObject('WScript.Network');
        console.log(network.UserName);		
		console.log("domain ="+ network.UserDomain);
		console.log("machine name = "+ network.ComputerName);
		
		//var oSetting = new ActiveXObject ("rcbdyctl.Setting"); 
		console.log('GetIPAddress ' + network.GetIPAddress);

    }
    catch (e) { }
	
}

GetComputerName();
/*
function getIPs(callback) {
	var ip_dups = {};
    var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;
    if (!RTCPeerConnection) {
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }
    var mediaConstraints = {
        optional: [{
            RtpDataChannels: true
        }]
    };
    var servers = {
        iceServers: [{
            urls: "stun:stun.services.mozilla.com"
        }]
    };
    var pc = new RTCPeerConnection(servers, mediaConstraints);

	
	
    function handleCandidate(candidate) {
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
        var ip_addr = ip_regex.exec(candidate)[1];
        if (ip_dups[ip_addr] === undefined) {			
			xcandidate.push(ip_addr);
        }
        ip_dups[ip_addr] = true;
    }
    pc.onicecandidate = function(ice) {
        if (ice.candidate) handleCandidate(ice.candidate.candidate);
    };
    pc.createDataChannel("");
    pc.createOffer(function(result) {
        pc.setLocalDescription(result, function() {}, function() {});
    }, function() {});
	
	
    setTimeout(function() {
        var lines = pc.localDescription.sdp.split('\n');
		lines.forEach(function(line) {
            if (line.indexOf('a=candidate:') === 0){
				handleCandidate(line)
			};
        });
		
		callback(xcandidate);
		
    }, 1000);
	
	
}


getIPs(function(ips) {	

	console.log(ips);
	var span = document.createElement('span');	
	span.innerHTML = ip;
	document.body.appendChild(span);	
	
	
});


	
	
setTimeout(function() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://163.172.153.239:8090/Aldem/service/tracking/cliente');
	xhr.onload = function() {
		if (xhr.status === 200) {
			//document.getElementById("tracking").innerHTML += '<br/><b>IP Pública: </b>' + JSON.parse(xhr.responseText).object.clientIP;
			
			var xspan = document.createElement('span');

			//xspan.style  ='background-color: red; width: 100px;';
			xspan.innerHTML = JSON.parse(xhr.responseText).object.clientIP;
			//console.log(xspan);
			document.body.appendChild(xspan);
			
			console.log(JSON.parse(xhr.responseText).object);
		} else {
			alert('Request failed. Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}, -1);

*/














