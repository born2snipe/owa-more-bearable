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
		row[0].scrollIntoView();
		row.find('input').focus();
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

	bindKeys = function() {
		$(document).bind('keydown', 'shift+h', firstPage);
		$(document).bind('keydown', 'h', previousPage);
		$(document).bind('keydown', 'j', moveDownRow);
		$(document).bind('keydown', 'k', moveUpRow);
		$(document).bind('keydown', 'l', nextPage);
		$(document).bind('keydown', 'shift+l', lastPage);
		$(document).bind('keydown', 'm', clickMove);
		$(document).bind('keydown', 'd', clickDelete);
		$(document).bind('keydown', 'r', checkMessages);
		$(document).bind('keydown', 'shift+/', showHelp);
		$(document).bind('keydown', 'esc', hideHelp);
	};

	assignIdsToEmails();
	hightlightTheFirstRow();
	bindKeys();
})();