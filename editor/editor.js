var currentEntity;

var editOffsetX;
var editOffsetY;

var numPlatforms = 0;
var numButtons = 0;

var createPlatforms = true;
var createImplo = false;
var createExplo = false;
var createImploEnd = false;
var createExploEnd = false;
var createButton = false;

var tool_Create = true;
var tool_Select = false;
var tool_Remove = false;

var startTest = false;
var levelId;

jQuery(function ($) {
	levelId = prompt("Level ID");
	$('#canvasContainer').hide();
	$('#stopTest').hide();

	editOffsetX = $('#gameEditorScreen').offset().left;
	editOffsetY = $('#gameEditorScreen').offset().top;

	$('#gameEditorScreen').append('<div id="' + levelId + '"></div>');

	createGrid(30);

	$(this).bind("contextmenu", function (e) { e.preventDefault(); });

	$('#saveLevel').click(function () {
		$('.gameEntity').each(function () {
			$(this).removeClass("ui-draggable");
			$(this).removeClass("ui-resizable");
			$(this).html('');
		});
	});

	$('.entitySelect').click(function () {
		$('.entitySelect').each(function () {
			$(this).removeClass('active');
		});

		createPlatforms = false;
		createImplo = false;
		createExplo = false;
		createImploEnd = false;
		createExploEnd = false;
		createButton = false;

		if ($(this).text() === 'Platform') {
			createPlatforms = true;
		} else if ($(this).text() === 'Implo') {
			createImplo = true;
		} else if ($(this).text() === 'Explo') {
			createExplo = true;
		} else if ($(this).text() === 'Implo End') {
			createImploEnd = true;
		} else if ($(this).text() === 'Explo End') {
			createExploEnd = true;
		}	else if ($(this).text() === 'Button') {
			createButton = true;
		}
		$(this).addClass('active');
	});

	$('.tool').click(function () {
		$('.tool').each(function () {
			$(this).removeClass('active');
		});

		tool_Create = false;
		tool_Select = false;
		tool_Remove = false;

		if ($(this).text() === 'Create') {
			tool_Create = true;
		} else if ($(this).text() === 'Select') {
			tool_Select = true;
		} else if ($(this).text() === 'Remove') {
			tool_Remove = true;
		}

		$(this).addClass('active');
	});

	$('#toggleGrid').click(function () {
		if ($(this).hasClass('active')) {
			$('#gridContainer').hide();
			$(this).removeClass('active');
		} else {
			$('#gridContainer').show();
			$(this).addClass('active');
		}
	});

	$('#test').click(function () {
		$(this).hide();
		$('#stopTest').show();
		$('#canvasContainer').show();
		startTesting(levelId);
	});

	$('#stopTest').click(function () {
		$(this).hide();
		$('#test').show();

		$('#canvasContainer').hide();
		$('#gameEditorScreen').show();
	});

	$('#gameEditorScreen').click(function (e) {
		var x = e.pageX,
			y = e.pageY;

		if (tool_Create) {
			$('.gameEntity').each(function () { $(this).removeClass('currentEntity'); });

			if (createPlatforms) {
				numPlatforms++;
				$( '#' + levelId ).append('<div id="platform'+numPlatforms+'" class="platform gameEntity currentEntity"></div>');
				$('#platform'+numPlatforms).draggable().resizable().offset({ top: y, left: x});
				$('#numPlatforms').text(numPlatforms);
			} else if(createImplo) {
				var imploId = '#' + levelId + '_implo';
				$(imploId).remove();
				$( '#' + levelId ).append('<div id="' + levelId + '_implo" class="gameEntity implo currentEntity"></div>');
				$(imploId).offset({ top: y, left: x}).draggable();
			} else if(createExplo) {
				var exploId = '#' + levelId + '_explo';
				$(exploId).remove();
				$( '#' + levelId ).append('<div id="' + levelId + '_explo" class="gameEntity explo currentEntity"></div>');
				$(exploId).offset({ top: y, left: x}).draggable();
			} else if (createImploEnd) {
				var imploEndId = '#' + levelId + '_imploEnd';
				$(imploEndId).remove();
				$( '#' + levelId ).append('<div id="' + levelId + '_imploEnd" class="gameEntity imploEnd currentEntity"></div>');
				$(imploEndId).offset({ top: y, left: x}).draggable();
			} else if ( createExploEnd ) {
				var exploEndId = '#' + levelId + '_exploEnd';
				$(exploEndId).remove();
				$('#' + levelId).append('<div id="' + levelId + '_exploEnd" class="gameEntity exploEnd currentEntity"></div>');
				$(exploEndId).offset({ top: y, left: x}).draggable();
			} else if ( createButton ) {
				numButtons += 1;
				$('#' + levelId).append('<div id="button' + numButtons + '" class="button gameEntity currentEntity"></div>');
				$('#button' + numButtons).offset({ top: y, left: x}).draggable();
				$('#numButtons').text(numButtons);
			}
		}

		if (tool_Select) {
			$('.gameEntity').click(function () {
				$('.gameEntity').each(function () {
					$(this).removeClass('currentEntity');
				});
				$('#x').val($(this).offset().left - editOffsetX);
				$('#y').val($(this).offset().top - editOffsetY);
				$('#w').val($(this).width());
				$('#h').val($(this).height());
				currentEntity = $(this);
				currentEntity.addClass('currentEntity');
			});
		}

		if (tool_Remove) {
			$('.gameEntity').click(function () {
				$(this).remove();
			});
		}
	}); // end gameEditorScreen click

	$('#delete').click(function () {
		$('#x').val('');
		$('#y').val('');
		$('#w').val('');
		$('#h').val('');

		$('.gameEntity').each(function () {
			if ($(this).hasClass('currentEntity')) {
				$(this).remove();
			}
		});
	});
});

function createGrid(size) {
    var ratioW = Math.floor(900/size),
        ratioH = Math.floor(600/size);

    var parent = $('<div />', {
        class: 'grid',
        width: ratioW  * size,
        height: ratioH  * size
    }).addClass('grid').appendTo('#gridContainer');

    for (var i = 0; i < ratioH; i++) {
        for(var p = 0; p < ratioW; p++){
            $('<div />', {
                width: size - 1,
                height: size - 1
            }).appendTo(parent);
        }
    }

    $('#gridContainer').hide();
}

function startTesting (levelId) {
	game.init(levelId);
	if ( !running ) { run(); }
    gameMode = GameMode.LOCAL;
}