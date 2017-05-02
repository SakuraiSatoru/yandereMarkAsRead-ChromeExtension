var re = /\d+/g;
var pNum = $(".plid").text();
thisURL = document.URL;
if (thisURL.search(/yande\.re\/post\/show\/\d+/) != -1 && pNum.length == 0){
	pNum = thisURL;
}

if(pNum){
	var msg1 = {
		type : "pool",
		title : pNum.match(re).join(",")
	};
	pBanner = document.getElementsByClassName("directlink-info");
	var pAccess = '';
	var port = chrome.runtime.connect({name: "yandere"});
	port.postMessage(msg1);
	port.onMessage.addListener(function(msg) {
		if (msg.type == "return"){
			pAccess = msg.title;
			for (var i=0;i<pAccess.length;i++){
				if(pAccess[i] != 0 && thisURL.search(/yande\.re\/post\/show\/\d+/) == -1){
					pBanner[i].parentNode.setAttribute("style","background:#559e98");
				}
			}
			
		}else{
			if(msg.type == "fail"){
				console.log(msg.title);
			}
		};
	});
}


