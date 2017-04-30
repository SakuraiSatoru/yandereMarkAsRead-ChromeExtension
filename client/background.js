var picData = {};
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "yandere");
  port.onMessage.addListener(function(msg) {
    if (msg.type == "pool"){
		picData = msg;
		picData.firstAccess = "loading...";
		$.ajax({
			url: "http://localhost/yandere.php",
			cache: false,
			type: "POST",
			data: picData.title,
			dataType: "json"
		}).done(function(msg) {
			picData.firstAccess = msg;
			
			var msg2 = {
				type : "return",
				title : picData.firstAccess.access
			};

			port.postMessage(msg2);
			
			
			
			
		}).fail(function(jqXHR, textStatus) {
			picData.firstAccess = textStatus;
			
			
			var msg2 = {
				type : "fail",
				title : picData.firstAccess.access
			};

			port.postMessage(msg2);
			
		});
		
		
	};
      
  });
});