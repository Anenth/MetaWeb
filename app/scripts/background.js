'use strict';


chrome.runtime.onInstalled.addListener(function (details) {
	console.log('previousVersion', details.previousVersion);

});
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     alert(tab.url); // also available as tab.id and changeInfo.url
// });
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	console.log(changeInfo.status );
	if(changeInfo.status === 'complete'){
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
			var url = tab.url;
			chrome.runtime.onConnect.addListener(function(port) {
				console.assert(port.name == "knockknock");
				port.onMessage.addListener(function(msg) {
					if (msg.test == "knock"){
						port.postMessage({ data: url });
					}
				});
			});
		});
	}
});
