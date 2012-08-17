(function() {
	var firstRowIndex = 3;
	var totalNumberOfRows = 0;
	var currentRowHighlighted = 0;

	generateEmailId = function(index) {
		return "__email_id__"+index;
	}

	assignIdsToEmails = function() {
		var count = 0;
		
		$(".lvw tr").each(function() {
			$(this).attr("id",  generateEmailId(count++));
		});
		totalNumberOfRows = count;
	};

	hightlightTheFirstRow = function() {
		hightlightRow(firstRowIndex);
	};

	hightlightRow = function(index) {
		var row = $("#"+generateEmailId(index));
		row.addClass("sl");
		row.find('input').focus();				
		if (row[0] != null) {
			row[0].scrollIntoView();
		}
		currentRowHighlighted = index;
	};

	unhightlightRow = function(index) {
		$("#"+generateEmailId(index)).removeClass("sl");
	};

	moveDownRow = function() {
		if (currentRowHighlighted < totalNumberOfRows - 1) {
			unhightlightRow(currentRowHighlighted);
			hightlightRow(++currentRowHighlighted);	
		}
	};

	moveUpRow = function() {
		if (currentRowHighlighted > firstRowIndex) {
			unhightlightRow(currentRowHighlighted);
			hightlightRow(--currentRowHighlighted);	
		}
	};

	clickMove = function() {
		$("#lnkHdrmove").click();
	};

	clickDelete = function() {
		$("#lnkHdrdelete").click();
	};

	checkMessages = function() {
		$("#lnkHdrcheckmessages").click();
	};

	showHelp = function() {
        var helpDiv = $("#__help__");

        if (helpDiv.length === 0) {
       		chrome.extension.sendMessage({}, function(response) {
  				helpDiv = $(response.help).appendTo($("body"));
			}); 	
        }
        helpDiv[0].scrollIntoView();
        helpDiv.show();
     };

     hideHelp = function() {
     	$("#__help__").hide();
     };

     previousPage = function() {
     	$("#lnkPrvPg").click();
     };

     nextPage = function() {
     	$("#lnkNxtPg").click();
     };

	lastPage = function() {
     	$("#lnkLstPg").click();
     };

	firstPage = function() {
     	$("#lnkFrstPg").click();
     };

     newEmail = function() {
     	$("#lnkHdrnewmsg").click();
     };

     openEmail = function() {
     	$("#"+generateEmailId(currentRowHighlighted)).find("a")[0].click();
     };

     closeEmail = function() {
     	$("#lnkHdrclose").click();
     };

     informUserOfHelp = function() {
		$("<div id='__help_notifiction__'><div class='inner'>Press '?' to see help</div></div>").appendTo($("body"));
     };

     replyToEmail = function() {
     	$("#lnkHdrreply").click();
     };

 	replyAllToEmail = function() {
     	$("#lnkHdrreplyall").click();
     };

	forwardEmail = function() {
     	$("#lnkHdrforward").click();
     };
     
	bindKeys = function() {
		$(document).bind('keydown', 'shift+h', firstPage);
		$(document).bind('keydown', 'h', previousPage);
		$(document).bind('keydown', 'j', moveDownRow);
		$(document).bind('keydown', 'k', moveUpRow);
		$(document).bind('keydown', 'l', nextPage);
		$(document).bind('keydown', 'shift+l', lastPage);
		$(document).bind('keydown', 'm', clickMove);
		$(document).bind('keydown', 'd', clickDelete);
		$(document).bind('keydown', 'alt+r', checkMessages);
		$(document).bind('keydown', 'shift+/', showHelp);
		$(document).bind('keydown', 'esc', hideHelp);
		$(document).bind('keydown', 'shift+n', newEmail);
		$(document).bind('keydown', 'o', openEmail);
		$(document).bind('keydown', 'c', closeEmail);
		$(document).bind('keydown', 'r', replyToEmail);
		$(document).bind('keydown', 'shift+r', replyAllToEmail);
		$(document).bind('keydown', 'f', forwardEmail);
	};

	assignIdsToEmails();
	hightlightTheFirstRow();
	informUserOfHelp();
	bindKeys();
})();