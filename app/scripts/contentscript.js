'use strict';

var addMetaInfoBar = function(){
	var infoBarDom = document.createElement('div');
	infoBarDom.setAttribute('id','MetaInfo');
	infoBarDom.setAttribute('class','MetaInfoBar');

	

	var titleDom = document.createElement('h4');
	titleDom.setAttribute('class','title');

	var rankDom = document.createElement('div');
	rankDom.setAttribute('class','rank MetaBox'); 

	var visitsDom = document.createElement('div');
	visitsDom.setAttribute('class','visits MetaBox');
	
	var query = '';
	var port = chrome.runtime.connect({name: "knockknock"});
	port.postMessage({test: "knock"});
	port.onMessage.addListener(function(msg) {
		console.log(msg.data);
		console.log(get_hostname(msg.data));
		query = get_hostname(msg.data);

		visitsDom.innerText = 2;
		var url = 'https://www.googleapis.com/freebase/v1/search';
		var params = {
			'query': query,
			'limit': 1,
			'indent': true
		};
		$.ajax({
			dataType: 'json',
			url: url,
			data: params,
			success: function(response) {
				rankDom.innerText = response.result[0].score;
				titleDom.innerText = response.result[0].name;
			}
		});
	});
	document.body.style.cssText = 'padding-top:40px';

	infoBarDom.appendChild(titleDom);
	infoBarDom.appendChild(rankDom);
	infoBarDom.appendChild(visitsDom);
	document.body.parentElement.insertBefore(infoBarDom, document.body);

};
var get_hostname = function(url) {
	url = url.replace("www.","");
    var m = url.match(/:\/\/(.[^/]+)/);
    return m ? m[1] : null;
}
addMetaInfoBar();