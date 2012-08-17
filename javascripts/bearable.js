(function() {
	var firstRowIndex = 3;
	var totalNumberOfRows = 0;
	var currentRowHighlighted = 0;

	assignIdsToEmails = function() {
		var count = 0;
		
		$(".lvw tr").each(function() {
			$(this).attr("id",  "__email_id__"+count++);
		});
		totalNumberOfRows = count;
	};

	hightlightTheFirstRow = function() {
		hightlightRow(firstRowIndex);
	};

	hightlightRow = function(index) {
		var row = $("#__email_id__"+index);
		row.addClass("sl");
		row[0].scrollIntoView();
		row.find('input').focus();
		currentRowHighlighted = index;
	};

	unhightlightRow = function(index) {
		$("#__email_id__"+index).removeClass("sl");
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

	bindKeys = function() {
		$(document).bind('keydown', 'j', moveDownRow);
		$(document).bind('keydown', 'k', moveUpRow);
		$(document).bind('keydown', 'm', clickMove);
		$(document).bind('keydown', 'd', clickDelete);
	};

	assignIdsToEmails();
	hightlightTheFirstRow();
	bindKeys();
})();