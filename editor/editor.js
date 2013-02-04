var currentEntity;

var numPlatforms = 0;
var numButtons = 0;

var createPlatforms = true;
var createWalter = false;
var createAlex = false;

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

function Player (x, y) {
	this.x = x;
	this.y = y;
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
		createWalter = false;
		createAlex = false;

		if ($(this).text() === 'Platform') {
			createPlatforms = true;
		} else if ($(this).text() === 'Walter') {
			createWalter = true;
		} else if ($(this).text() === 'Alex') {
			createAlex = true;
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

	$('.levelImage').click(function (e) {
		var x = e.pageX,
			y = e.pageY;

		if (tool_Create) {
			if (createPlatforms) {
				numPlatforms++;
				$('body').append('<div id="platform'+numPlatforms+'" class="platform gameEntity"></div>');
				$('#platform'+numPlatforms).draggable().resizable().offset({ top: y, left: x});
				$('#numPlatforms').text(numPlatforms);
			} else if (createWalter) {
				$('.walter').remove();
				$('body').append('<div class="walter"></div>');
				$('.walter').draggable().offset({ top: y, left: x});
			} else if (createAlex) {
				$('.alex').remove();
				$('body').append('<div class="alex"></div>');
				$('.alex').draggable().offset({ top: y, left: x});
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
		levelData = {};
		$('.platform').each(function () {
			platforms.push(new Platform(
				$(this).offset().left,
				$(this).offset().top,
				$(this).width(),
				$(this).height()));
		});
		levelData['platforms'] = platforms;

		levelData['alex'] = new Player($('.alex').offset().left, $('.alex').offset().top);
		levelData['walter'] = new Player($('.walter').offset().left, $('.walter').offset().top);

		alert(JSON.stringify(levelData));
	});

	$('#load').click(function (e) {
		var levelDataString = prompt("Level data");
		levelData = JSON.parse(levelDataString);
		numPlatforms = 0;

		var x, y, w, h;

		for (var i in levelData['platforms'])
		{
			numPlatforms++;

			x = levelData["platforms"][i].x;
            y = levelData["platforms"][i].y;
            w = levelData["platforms"][i].w;
            h = levelData["platforms"][i].h;

			$('body').append('<div id="platform'+numPlatforms+'" class="platform gameEntity"></div>');
			$('#platform'+numPlatforms).draggable().resizable().offset({ top: y, left: x}).width(w).height(h);
		}

		// Load Alex
		x = levelData['alex'].x;
		y = levelData['alex'].y;
		$('.alex').remove();
		$('body').append('<div class="alex"></div>');
		$('.alex').draggable().offset({ top: y, left: x});

		// Load Walter
		x = levelData['walter'].x;
		y = levelData['walter'].y;
		$('.walter').remove();
		$('body').append('<div class="walter"></div>');
		$('.walter').draggable().offset({ top: y, left: x});
	});
});