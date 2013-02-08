var AssetManager;
(function (AssetManager) {
    var priorityImages = [
        'data/images/FirstAlexBar.png', 
        'data/images/FirstWalterBar.png', 
        'data/images/level_design_level_01_00.png', 
        'data/images/Pipe1.png', 
        'data/images/Pipe3.png', 
        'data/images/Pipe4.png', 
        'data/images/waterParticle.png', 
        'data/images/menu/Menu.png', 
        'data/images/menu/button.png', 
        'data/images/menu/highlightedbutton.png', 
        'data/images/menu/walteralex.png', 
        'data/images/extension.png', 
        'data/images/eyes.png', 
        'data/images/objectmap.png', 
        'data/images/walterControl.png', 
        'data/images/alexControl.png', 
        'data/images/fridge.png', 
        'data/images/wall.png', 
        'data/images/level_design_level_01_00_front.png', 
        'data/images/level_design_level_01_00_back.png', 
        'data/images/Propeller.png', 
        'data/images/Ligthning_for_wire_01.png', 
        'data/images/Ligthning_for_wire_03.png', 
        'data/images/Ligthning_for_wire_04.png', 
        'data/images/EmptyBar.png'
    ];
    var priorityAudio = [
        'data/sounds/theme.wav', 
        'data/sounds/browse.wav', 
        'data/sounds/select.wav', 
        'data/sounds/marioCoin.wav', 
        'data/sounds/jump.wav'
    ];
    AssetManager.images = [];
    AssetManager.sounds = [];
    function getImage(imageName) {
        return AssetManager.images[imageName];
    }
    AssetManager.getImage = getImage;
    function getSound(s) {
        return AssetManager.sounds[s];
    }
    AssetManager.getSound = getSound;
    function loadImages(sources, callback) {
        var images = [];
        var loadedImages = 0;
        var numImages = 0;
        for(var src in sources) {
            numImages++;
        }
        for(var src in sources) {
            var name = sources[src].match("[a-z,A-Z,0-9,_]+[.]png")[0].replace(".png", "");
            if(images[name] == null) {
                images[name] = new Image();
                images[name].onload = function () {
                    Logger.log(" Image " + this.src + " loaded sucessfully ");
                    if(++loadedImages >= numImages) {
                        AssetManager.images = images;
                        callback();
                    }
                };
            } else {
                Logger.error("Image " + sources[src] + " has the same name as" + images[name].src);
            }
            images[name].src = sources[src];
        }
    }
    AssetManager.loadImages = loadImages;
    function addSpritesDefToLoadList() {
        for(var sprite in Sprites.animations) {
            priorityImages.push("data/images/" + Sprites.animations[sprite].imageName + ".png");
        }
    }
    AssetManager.addSpritesDefToLoadList = addSpritesDefToLoadList;
    function loadAssets(callback) {
        addSpritesDefToLoadList();
        loadImages(priorityImages, function () {
            loadSounds(priorityAudio, callback);
            if(priorityAudio.length <= 0) {
                callback();
            }
        });
    }
    AssetManager.loadAssets = loadAssets;
    function loadSounds(sources, callback) {
        try  {
            var bufferLoader = new BufferLoader(Sound.context, sources, function (bufferList) {
                for(var i = 0; i < bufferList.length; i++) {
                    AssetManager.sounds[bufferList[i].name] = new Sound(bufferList[i].buffer);
                }
                callback();
            });
            bufferLoader.load();
        } catch (e) {
            callback();
        }
    }
    AssetManager.loadSounds = loadSounds;
})(AssetManager || (AssetManager = {}));
