var currentEntity;

var numPlatforms = 0;
var numButtons = 0;

var createPlatforms = true;

var tool_Create = true;
var tool_Select = false;
var tool_Remove = false;
var levelId = 100;
var levelData = {};

var platforms = [];

function Platform (x, y, w, h) {
	this.x = x;
	this.y = y;
	this.h = h;
	this.w = w;
}

jQuery(function ($) {

	//Disable right click
	// $(this).bind("contextmenu", function (e) { e.preventDefault(); });

	$('#entitySelect').draggable();

	$('.entitySelect').click(function () {
		$('.entitySelect').each(function () {
			$(this).removeClass('active');
		});

		createPlatforms = false;

		if ($(this).text() === 'Platform') {
			createPlatforms = true;
		}
		$(this).addClass('active');
	});

	$('.tool').click(function () {
		$('.tool').each(function () {
			$(this).removeClass('active');
		});

		tool_Create = false;
		tool_Remove = false;

		if ($(this).text() === 'Create') {
			tool_Create = true;
		} else if ($(this).text() === 'Remove') {
			tool_Remove = true;
		}

		$(this).addClass('active');
	});

	$('body').click(function (e) {
		var x = e.pageX,
			y = e.pageY;

		if (tool_Create) {
			if (createPlatforms) {
				numPlatforms++;
				$('body').append('<div id="platform'+numPlatforms+'" class="platform gameEntity"></div>');
				$('#platform'+numPlatforms).draggable().resizable().offset({ top: y, left: x});
				$('#numPlatforms').text(numPlatforms);
			}
		}

		if (tool_Remove) {
			$('.gameEntity').click(function () {
				$(this).remove();
			});
		}
	});

	$('#save').click(function (e) {
		platforms = [];
		$('.platform').each(function () {
			platforms.push(new Platform(
				$(this).offset().left,
				$(this).offset().top,
				$(this).width(),
				$(this).height()));
		});
		levelData['platforms'] = platforms;
		console.log(JSON.stringify(levelData));
	});
});