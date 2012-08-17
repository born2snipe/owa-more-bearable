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
	}

	bindKeys = function() {
		$(document).bind('keydown', 'j', moveDownRow);
		$(document).bind('keydown', 'k', moveUpRow);
	};

	assignIdsToEmails();
	hightlightTheFirstRow();
	bindKeys();
})();