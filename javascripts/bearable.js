(function() {
	var firstRowIndex = 3;
	var totalNumberOfRows = 0;
	var currentRowHighlighted = 0;
	var hotkeys = new Array();
	var helpTitle = "";

	registerHotKey = function(keystroke, functionToInvoke, description) {
		$(document).bind('keydown', keystroke, functionToInvoke);
		hotkeys[keystroke] = description;
	};

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

	selectAndMoveDownRow = function() {
		toggleRow(currentRowHighlighted);
		moveDownRow();
	};

	selectAndMoveUpRow = function() {
		toggleRow(currentRowHighlighted);
		moveUpRow();
	};

	toggleRow = function(index) {
		var row = $("#"+generateEmailId(index));
		var checkbox = row.find('input');
		checkbox.prop("checked", !checkbox.prop("checked"));
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
        	var hotkeyHtml = "";

			for (var keystroke in hotkeys) {
				hotkeyHtml += "<li>";
				hotkeyHtml += "<span>"+keystroke+":</span>";
				hotkeyHtml += hotkeys[keystroke];
				hotkeyHtml += "</li>";
			}

			$("<div id='__help__'>"+
				"<div class='inner'>"+
				"<div class='title'>"+helpTitle+"</div>"+
			    "<ul>"+
				hotkeyHtml +		         
			     "</ul>"+
	     	"</div></div>").appendTo($("body"));
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

     isEmailListPage = function() {
     	return $("a:contains('New Message')").length != 0;
     };

     isViewingAnEmail = function() {
     	return $("a:contains('Reply')").length != 0;
     }

     clickNextItem = function() {
     	$("#lnkHdrnext").click();
     };

     clickPreviousItem = function() {
     	$("#lnkHdrprevious").click();
     };

	bindKeys = function() {
		helpTitle = "Help: ";
		hotkeys = new Array();

		registerHotKey('shift+/', showHelp, 'Show help');
		registerHotKey('esc', hideHelp, 'Hide help');

		if (isEmailListPage()) {
			helpTitle += "Email list";

			registerHotKey('shift+h', firstPage, 'Go to first page of emails');
			registerHotKey('h', previousPage, 'Go to previous page of emails');
			registerHotKey('shift+j', selectAndMoveDownRow, 'Select email and move down an email');
			registerHotKey('j', moveDownRow, 'Move down an email');
			registerHotKey('shift+k', selectAndMoveUpRow, 'Select email and move up an email');
			registerHotKey('k', moveUpRow, 'Move up an email');
			registerHotKey('l', nextPage, 'Go to next page of emails');
			registerHotKey('shift+l', lastPage, 'Go to last page of emails');
			registerHotKey('m', clickMove, 'Move selected email(s)');
			registerHotKey('d', clickDelete, 'Delete selected email(s)');
			registerHotKey('alt+r', checkMessages, 'Check for new email messages');
			registerHotKey('shift+n', newEmail, 'Start a new email message');
			registerHotKey('o', openEmail, 'Open current email');	
		}
		
		if (isViewingAnEmail()) {
			helpTitle += "Viewing Email";

			registerHotKey('c', closeEmail, 'Close opened email');
			registerHotKey('r', replyToEmail, 'Reply to sender of email');
			registerHotKey('shift+r', replyAllToEmail, 'Reply to All recipients of email');
			registerHotKey('f', forwardEmail, 'Forward email to others');
			registerHotKey('m', clickMove, 'Move email');
			registerHotKey('d', clickDelete, 'Delete email');
			registerHotKey('j', clickNextItem, 'Next email');
			registerHotKey('k', clickPreviousItem, 'Previous email');
		}

	};

	assignIdsToEmails();
	hightlightTheFirstRow();
	informUserOfHelp();
	bindKeys();
})();