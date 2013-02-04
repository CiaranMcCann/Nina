var currentEntity;

var numPlatforms = 0;
var numWaterCoins = 0;
var numElecCoins = 0;

var createPlatforms = true;
var createWalter = false;
var createAlex = false;
var createWaterCoin = false;
var createElecCoin = false;

var tool_Create = true;
var tool_Select = false;
var tool_Remove = false;
var levelId = 100;

var levelData = {};
var platforms = [];

var levelImage = '../data/images/';

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

function Coin (x, y) {
	this.x = x;
	this.y = y;
}

jQuery(function ($) {

	levelImage += prompt("Level image name");
	levelImage += '.png';

	$('.levelImage').attr('src', levelImage);

	//Disable right click
	$(this).bind("contextmenu", function (e) { e.preventDefault(); });

	$('#entitySelect').draggable();

	$('.entitySelect').click(function () {
		$('.entitySelect').each(function () {
			$(this).removeClass('active');
		});

		createPlatforms = false;
		createWalter = false;
		createAlex = false;
		createWaterCoin = false;
		createElecCoin = false;

		if ($(this).text() === 'Platform') {
			createPlatforms = true;
		} else if ($(this).text() === 'Walter') {
			createWalter = true;
		} else if ($(this).text() === 'Alex') {
			createAlex = true;
		} else if ($(this).text() === 'WaterCoin') {
			createWaterCoin = true;
		} else if ($(this).text() === 'ElecCoin') {
			createElecCoin = true;
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
			if (createPlatforms)		{ CreatePlatform(x, y, 30, 30); }
			else if (createWalter)		{ CreateWalter(x, y); }
			else if (createAlex)		{ CreateAlex(x, y); }
			else if (createWaterCoin)	{ CreateWaterCoin(x, y); }
			else if (createElecCoin)	{ CreateElecCoin(x, y); }
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

		var waterCoins = [];
		$('.waterCoin').each(function () {
			waterCoins.push(new Coin($(this).offset().left, $(this).offset().top));
		});
		levelData['waterCoins'] = waterCoins;

		var elecCoins = [];
		$('.elecCoin').each(function () {
			elecCoins.push(new Coin($(this).offset().left, $(this).offset().top));
		});
		levelData['elecCoins'] = elecCoins;

		alert(JSON.stringify(levelData));
	});

	$('#load').click(function (e) {
		var levelDataString = prompt("Level data");
		levelData = JSON.parse(levelDataString);
		numPlatforms = 0;

		var x, y, w, h, i;

		for (i in levelData['platforms'])
		{
			numPlatforms++;

			x = levelData["platforms"][i].x;
            y = levelData["platforms"][i].y;
            w = levelData["platforms"][i].w;
            h = levelData["platforms"][i].h;

            CreatePlatform(x, y, w, h);
		}

		// Load Alex
		x = levelData['alex'].x;
		y = levelData['alex'].y;
		CreateAlex(x, y);

		// Load Walter
		x = levelData['walter'].x;
		y = levelData['walter'].y;
		CreateWalter(x, y);

		for (i in levelData['waterCoins'])
		{
			x = levelData['waterCoins'][i].x;
			y = levelData['waterCoins'][i].y;
			CreateWaterCoin(x, y);
		}
		for (i in levelData['elecCoins'])
		{
			x = levelData['elecCoins'][i].x;
			y = levelData['elecCoins'][i].y;
			CreateElecCoin(x, y);
		}
	});
});

function CreatePlatform (x, y, w, h) {
	numPlatforms++;
	$('body').append('<div id="platform'+numPlatforms+'" class="platform gameEntity"></div>');
	$('#platform'+numPlatforms).draggable().resizable().offset({ top: y, left: x}).width(w).height(h);
}

function CreateWalter (x, y) {
	$('.walter').remove();
	$('body').append('<div class="walter"></div>');
	$('.walter').draggable().offset({ top: y, left: x});
}

function CreateAlex (x, y) {
	$('.alex').remove();
	$('body').append('<div class="alex"></div>');
	$('.alex').draggable().offset({ top: y, left: x});
}

function CreateWaterCoin (x, y) {
	numWaterCoins++;
	$('body').append('<div id="wc'+numWaterCoins+'" class="waterCoin"></div>');
	$('#wc'+numWaterCoins).draggable().offset({ top: y, left: x});
}

function CreateElecCoin (x, y) {
	numElecCoins++;
	$('body').append('<div id="ec'+numElecCoins+'" class="elecCoin"></div>');
	$('#ec'+numElecCoins).draggable().offset({ top: y, left: x});
}