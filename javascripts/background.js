chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	sendResponse({
		help: "<div id='__help__'>"+
			"<div class='inner'>"+
		    "<ul>"+
		          "<li><span>?:</span>Show this help</li>"+
		         " <li><span>esc:</span>Hide help</li>"+
		          "<hr>"+
		          "<li><span>j:</span>Move down an email</li>"+
		          "<li><span>k:</span>Move up an email</li>"+
		          "<hr>"+
		          "<li><span>m:</span>Move selected email</li>"+
		          "<li><span>d:</span>Delete selected email</li>"+
		          "<li><span>r:</span>Check for new emails</li>"+
		     "</ul>"+
     	"</div></div>"
	});
});